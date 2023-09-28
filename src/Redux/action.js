import {
  ERROR,
  LOADING,
  USERS,
  LEAGUE_CATEGORY,
  USER_STATUS,
  PREVIOUS_LEAGUE,
} from "./actionTypes";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import Papa from "papaparse";
const USER_SHEET_ID = process.env.REACT_APP_USER_SHEET_ID;
const MASTER_SHEET_ID = process.env.REACT_APP_MASTER_SHEET_ID;

export const getLoading = () => ({
  type: LOADING,
});

export const getError = () => ({
  type: ERROR,
});

export const getUsers = (payload) => ({
  type: USERS,
  payload,
});

export const getLeagueCategory = (payload) => ({
  type: LEAGUE_CATEGORY,
  payload,
});

export const getUserStatus = (payload) => ({
  type: USER_STATUS,
  payload,
});

export const getPreviousLeague = (payload) => ({
  type: PREVIOUS_LEAGUE,
  payload,
});

export const getMasterSheetData = async (leagueId) => {
  try {
    let leagueCategory = await new Promise((resolve, reject) => {
      Papa.parse(MASTER_SHEET_ID, {
        download: true,
        complete: (results) => {
          const data = results.data;
          const league = data.filter((val) => +val[0] === +leagueId);
          const leagueCategory = league.length > 0 ? league[0][1] : null;
          resolve(leagueCategory);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
    return leagueCategory;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchUsers = (email, mode) => async (dispatch) => {
  try {
    dispatch(getLoading());
    const paramMode = !mode ? "" : `&mode=${mode}`;
    await axios.post(
      `https://script.google.com/macros/s/AKfycbxIx4byv5A6E5N1wsXHB1FvYe3lORG9DReJifybkdOfu_zroENC3Fo6qB94MTt11iDt/exec?email=${email}${paramMode}`
    );
    const finalUsers = [];
    Papa.parse(USER_SHEET_ID, {
      download: true,
      complete: async (results) => {
        const data = results.data;
        let status = "";
        if (data.length === 0 || !email) {
          dispatch(getUsers());
          console.log("No data");
          return;
        }
        const [usersCurrentLeague] = data.filter(
          (val) => val[2] === email && val[3] === "current"
        );

        if (usersCurrentLeague && usersCurrentLeague.length > 0) {
          status = "currentLeagueFound";
        } else {
          const usersOldLeague = data.filter((val) => val[2] === email);
          if (usersOldLeague.length > 0) {
            status = "oldLeagueFound";
          } else {
            status = "userDataNotOnSheet";
            dispatch(getUsers());
            console.log("No Users");
            return;
          }
        }
        let userLeagueId = 0;
        let leagueCategory = "";
        let leagueStatus = "";
        if (status === "currentLeagueFound") {
          userLeagueId = +usersCurrentLeague[0];
          leagueCategory = await getMasterSheetData(userLeagueId);
          const usersOldLeague = data.filter(
            (val) => val[2] === email && val[3] !== "current"
          );
          const lastLeague = usersOldLeague[usersOldLeague.length - 1];
          dispatch(getPreviousLeague(lastLeague));
          dispatch(getLeagueCategory(leagueCategory));
          dispatch(getUserStatus("current"));
          leagueStatus = "current";
        } else if (status === "oldLeagueFound") {
          const usersOldLeague = data.filter((val) => val[2] === email);
          const lastLeague = usersOldLeague[usersOldLeague.length - 1];
          userLeagueId = +lastLeague[0];
          leagueCategory = await getMasterSheetData(userLeagueId);
          dispatch(getPreviousLeague(lastLeague));
          dispatch(getLeagueCategory(leagueCategory));
          leagueStatus = lastLeague[3];
          dispatch(getUserStatus(leagueStatus));
        }
        const currentData = [];
        for (let i = 1; i < data.length; i++) {
          const leagueId = data[i][0];
          if (+leagueId === userLeagueId) {
            const totalCorrect = Number(data[i][4]);
            const firstname = data[i][1];
            const email = data[i][2];
            const userStatus = data[i][3];
            if (status === "currentLeagueFound") {
              currentData.push({
                email,
                name: firstname,
                totalCorrect,
                status: userStatus,
              });
            } else {
              finalUsers.push({
                email,
                totalCorrect,
                name: firstname,
                status: userStatus,
              });
            }
          }
        }
        if (currentData.length > 0) {
          const sortedCurrentData = currentData.sort(
            (a, b) => b.totalCorrect - a.totalCorrect
          );
          // console.log(sortedCurrentData);
          let promotedLength = Math.round(sortedCurrentData.length * 0.9);
          let retainedLength = sortedCurrentData.length - promotedLength;
          let proMin = sortedCurrentData[promotedLength - 2]?.totalCorrect;
          let retMax = sortedCurrentData[promotedLength - 1]?.totalCorrect;
          let retMin = 0;
          if (proMin === retMax) {
            proMin++;
          }
          for (let i = 0; i < sortedCurrentData.length; i++) {
            if (sortedCurrentData[i].totalCorrect >= proMin) {
              sortedCurrentData[i].status = "promoted";
            } else if (
              sortedCurrentData[i].totalCorrect <= retMax &&
              sortedCurrentData[i].totalCorrect >= retMin
            ) {
              sortedCurrentData[i].status = "retained";
            } else if (sortedCurrentData[i].totalCorrect < retMin) {
              sortedCurrentData[i].status = "demoted";
            }
          }
          // console.log(sortedCurrentData);
          dispatch(getUsers(sortedCurrentData));
        } else {
          const sortedFinalUsers = finalUsers.sort(
            (a, b) => b.totalCorrect - a.totalCorrect
          );
          dispatch(getUsers(sortedFinalUsers));
        }
      },
    });
  } catch (error) {
    dispatch(getError());
  }
};

// export const fetchLeagueUsers = () => async (dispatch) => {
//   try {
//     dispatch(getLoading());
//     const leaguesUser = [];
//     Papa.parse(LEAGUE_SHEET_ID, {
//       download: true,
//       complete: (results) => {
//         const data = results.data;
//         for (let i = 1; i < data.length; i++) {
//           const email = data[i][0];
//           const leagueId = data[i][1];
//           const leagueName = data[i][2];
//           const leagueEntryDate = data[i][3];
//           const nextLeagueDate = data[i][4];
//           const leagueExitDate = data[i][5];
//           const obj = {
//             email,
//             leagueId,
//             leagueName,
//             leagueEntryDate,
//             nextLeagueDate,
//             leagueExitDate,
//           };
//           leaguesUser.push(obj);
//         }
//         dispatch(getLeagueUsers(leaguesUser));
//       },
//     });
//   } catch (e) {
//     console.error("Error: ", e);
//   }
// };

// export const addLeagueUser = (email) => async (dispatch) => {
//   try {
//     dispatch(getLoading());
//   } catch (e) {
//     console.error("Error: ", e);
//   }
// };

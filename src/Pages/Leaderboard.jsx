import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeagueUsers, fetchUsers } from "../Redux/action";
import Avatar, { genConfig } from "react-nice-avatar";
import "../styles/loading.scss";
import first from "../assets/1st.png";
import second from "../assets/2nd.png";
import { Header } from "../components/Header";
export const Leaderboard = () => {
  const dispatch = useDispatch();
  const { loading, error, users, leagueCategory } = useSelector(
    (state) => state
  );
  const searchParams = new URLSearchParams(document.location.search);
  const emailParam = searchParams.get("email");
  const modeParam = searchParams.get("mode");

  useEffect(() => {
    dispatch(fetchUsers(emailParam, modeParam));
  }, []);

  if (loading) {
    return (
      <div className="placeCenter">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="placeCenterNew">
        <p>Something Went Wrong, please refresh</p>
      </div>
    );
  }

  if (!users) {
    return (
      <div className="placeCenterNew">
        <p>Participate in more quizzes to view your Leaderboard</p>
      </div>
    );
  }
  return (
    <main>
      <Header />
      <div className="usersDiv">
        <div className="promotion">
          <p>PROMOTION ZONE</p>
        </div>
        <div className="promotedSection">
          {users && users.length > 0 ? (
            users.map(
              ({ name, email, totalCorrect, status }, index) =>
                status === "promoted" && (
                  <div
                    key={index}
                    className={
                      email === emailParam
                        ? "promoted myEmailDiv"
                        : index !== 0 && index !== 1 && index !== 2
                        ? "promoted othersDiv"
                        : "promoted"
                    }
                  >
                    <div className="LeftDiv">
                      {index === 0 ? (
                        <img
                          className="logo1 rankLogo"
                          src={first}
                          alt="1st-logo"
                        />
                      ) : index === 1 ? (
                        <img
                          className="logo2 rankLogo"
                          src={second}
                          alt="2nd-logo"
                        />
                      ) : index === 2 ? (
                        <img
                          className="logo3 rankLogo"
                          src={first}
                          alt="3rd-logo"
                        />
                      ) : (
                        <h4>{index + 1}</h4>
                      )}
                      <Avatar
                        className={
                          index === 0 || index === 1 || index === 2
                            ? "top3"
                            : null
                        }
                        style={{ width: "40px", height: "40px" }}
                        {...genConfig(name)}
                      />
                      <p className="name">{name}</p>
                    </div>
                    <p>{totalCorrect}</p>
                  </div>
                )
            )
          ) : (
            <div>Participate in more quizzes to view your Leaderboard</div>
          )}
        </div>
        <div className="demotion">
          <p>DANGER ZONE</p>
        </div>
        <div className="demotedSection">
          {users && users.length > 0 ? (
            users.map(
              ({ name, email, totalCorrect, status }, index) =>
                (status === "demoted" || status === "retained") && (
                  <div
                    key={index}
                    className={
                      email === emailParam
                        ? "demoted myEmailDiv"
                        : index !== 0 && index !== 1 && index !== 2
                        ? "demoted othersDiv"
                        : "demoted"
                    }
                  >
                    <div className="LeftDiv">
                      <h4>{index + 1}</h4>
                      <Avatar
                        style={{ width: "40px", height: "40px" }}
                        {...genConfig(name)}
                      />
                      <p className="name">{name}</p>
                    </div>
                    <p>{totalCorrect}</p>
                  </div>
                )
            )
          ) : (
            <div>The Leaderboard is not available yet</div>
          )}
        </div>
      </div>
    </main>
  );
};

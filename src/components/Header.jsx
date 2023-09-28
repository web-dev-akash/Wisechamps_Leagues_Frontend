import React, { useEffect, useState } from "react";
import "../styles/header.scss";
import stone from "../assets/stone.png";
import iron from "../assets/iron.png";
import bronze from "../assets/bronze.png";
import silver from "../assets/silver.png";
import gold from "../assets/gold.png";
import diamond from "../assets/diamond.png";
import {
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
export const Header = () => {
  const { leagueCategory } = useSelector((state) => state);
  const [headerClass, setHeaderClass] = useState("");
  const league = {
    Stone: 0,
    Iron: 1,
    Bronze: 2,
    Silver: 3,
    Gold: 4,
    Diamond: 5,
  };

  useEffect(() => {
    setTimeout(() => {
      setHeaderClass("leagues-header");
    }, 1000);
  });

  return (
    <div>
      <header>
        <h4>Weekly Leaderboard</h4>
        <Spacer height={2} />
        <hr />
      </header>
      <section className={headerClass}>
        <Tabs isFitted variant="enclosed" defaultIndex={league[leagueCategory]}>
          <TabList>
            <Tab
              bgColor={"white"}
              padding={"10px 0px"}
              isDisabled={league[leagueCategory] !== 0}
              className={league[leagueCategory] === 0 ? "active" : ""}
            >
              <img width={"35px"} src={stone} alt="league-logo" />
            </Tab>
            <Tab
              bgColor={"white"}
              padding={"10px 0px"}
              isDisabled={league[leagueCategory] !== 1}
              className={league[leagueCategory] === 1 ? "active" : ""}
            >
              <img width={"35px"} src={iron} alt="league-logo" />
            </Tab>
            <Tab
              bgColor={"white"}
              isDisabled={league[leagueCategory] !== 2}
              className={league[leagueCategory] === 2 ? "active" : ""}
              padding={"10px 0px"}
            >
              <img width={"35px"} src={bronze} alt="league-logo" />
            </Tab>
            <Tab
              bgColor={"white"}
              isDisabled={league[leagueCategory] !== 3}
              className={league[leagueCategory] === 3 ? "active" : ""}
              padding={"10px 0px"}
            >
              <img width={"35px"} src={silver} alt="league-logo" />
            </Tab>
            <Tab
              bgColor={"white"}
              isDisabled={league[leagueCategory] !== 4}
              className={league[leagueCategory] === 4 ? "active" : ""}
              padding={"10px 0px"}
            >
              <img width={"35px"} src={gold} alt="league-logo" />
            </Tab>
            <Tab
              bgColor={"white"}
              padding={"10px 0px"}
              isDisabled={league[leagueCategory] !== 5}
              className={league[leagueCategory] === 5 ? "active" : ""}
            >
              <img width={"35px"} src={diamond} alt="league-logo" />
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel className="leagueName">
              <div>
                <p>Stone League</p>
              </div>
            </TabPanel>
            <TabPanel className="leagueName">
              <div>
                <p>Iron League</p>
              </div>
            </TabPanel>
            <TabPanel className="leagueName">
              <div>
                <p>Bronze League</p>
              </div>
            </TabPanel>
            <TabPanel className="leagueName">
              <div>
                <p>Silver League</p>
              </div>
            </TabPanel>
            <TabPanel className="leagueName">
              <div>
                <p>Gold League</p>
              </div>
            </TabPanel>
            <TabPanel className="leagueName">
              <div>
                <p>Diamond League</p>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </section>
    </div>
  );
};

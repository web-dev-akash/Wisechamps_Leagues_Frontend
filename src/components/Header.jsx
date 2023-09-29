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
import { HiOutlineInformationCircle } from "react-icons/hi";
export const Header = () => {
  const { leagueCategory } = useSelector((state) => state);
  const [headerClass, setHeaderClass] = useState("");
  const [toolTip, setTooltip] = useState(false);
  const league = {
    Stone: 0,
    Iron: 1,
    Bronze: 2,
    Silver: 3,
    Gold: 4,
    Diamond: 5,
  };

  const toggleTooltip = () => {
    setTooltip(!toolTip);
  };

  const toggleTooltipFalse = () => {
    setTooltip(false);
  };

  const toggleTooltipTrue = () => {
    setTooltip(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setHeaderClass("leagues-header");
    }, 1000);
  });

  return (
    <div>
      <header>
        <div className="info-icon">
          <HiOutlineInformationCircle
            onClick={toggleTooltip}
            onMouseEnter={toggleTooltipTrue}
            onMouseLeave={toggleTooltipFalse}
          />
        </div>
        <h3>Weekly Leaderboard</h3>
        <Spacer height={2} />
        <hr />
      </header>
      <section className={headerClass}>
        <Tabs isFitted variant="enclosed" defaultIndex={league[leagueCategory]}>
          <TabList borderColor={"blackAlpha.500"}>
            <Tab
              bgColor={"white"}
              padding={league[leagueCategory] === 0 ? "5px 20px" : "0"}
              isDisabled={league[leagueCategory] !== 0}
              className={league[leagueCategory] === 0 ? "active" : ""}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <p
                style={{
                  opacity: 0,
                  transition: "all 0.3s linear",
                  display:
                    league[leagueCategory] !== 0 && toolTip ? "block" : "none",
                }}
                className={
                  league[leagueCategory] !== 0 && toolTip ? "show" : "hide"
                }
              >
                Stone
              </p>
              <img width={"35px"} src={stone} alt="league-logo" />
              <p
                style={{
                  transition: "all 0.3s linear",
                  position: "relative",
                  fontSize: "11px",
                  top: "0.5rem",
                  width: "150%",
                  opacity: "0",
                  color: "black",
                  display: league[leagueCategory] === 0 ? "block" : "none",
                }}
              >
                Stone League
              </p>
            </Tab>
            <Tab
              bgColor={"white"}
              padding={league[leagueCategory] === 1 ? "5px 20px" : "0"}
              isDisabled={league[leagueCategory] !== 1}
              className={league[leagueCategory] === 1 ? "active" : ""}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <p
                style={{
                  opacity: 0,
                  transition: "all 0.3s linear",
                  display:
                    league[leagueCategory] !== 1 && toolTip ? "block" : "none",
                }}
                className={
                  league[leagueCategory] !== 1 && toolTip ? "show" : "hide"
                }
              >
                Iron
              </p>
              <img width={"35px"} src={iron} alt="league-logo" />
              <p
                style={{
                  transition: "all 0.3s linear",
                  position: "relative",
                  fontSize: "11px",
                  top: "0.5rem",
                  width: "150%",
                  opacity: "0",
                  color: "black",
                  display: league[leagueCategory] === 1 ? "block" : "none",
                }}
              >
                Iron League
              </p>
            </Tab>
            <Tab
              bgColor={"white"}
              padding={league[leagueCategory] === 2 ? "5px 20px" : "0"}
              isDisabled={league[leagueCategory] !== 2}
              className={league[leagueCategory] === 2 ? "active" : ""}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <p
                style={{
                  opacity: 0,
                  transition: "all 0.3s linear",
                  display:
                    league[leagueCategory] !== 2 && toolTip ? "block" : "none",
                }}
                className={
                  league[leagueCategory] !== 2 && toolTip ? "show" : "hide"
                }
              >
                Bronze
              </p>
              <img width={"35px"} src={bronze} alt="league-logo" />
              <p
                style={{
                  transition: "all 0.3s linear",
                  position: "relative",
                  fontSize: "11px",
                  top: "0.5rem",
                  width: "150%",
                  opacity: "0",
                  color: "black",
                  display: league[leagueCategory] === 2 ? "block" : "none",
                }}
              >
                Bronze League
              </p>
            </Tab>
            <Tab
              bgColor={"white"}
              padding={league[leagueCategory] === 3 ? "5px 20px" : "0"}
              isDisabled={league[leagueCategory] !== 3}
              className={league[leagueCategory] === 3 ? "active" : ""}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <p
                style={{
                  opacity: 0,
                  transition: "all 0.3s linear",
                  display:
                    league[leagueCategory] !== 3 && toolTip ? "block" : "none",
                }}
                className={
                  league[leagueCategory] !== 3 && toolTip ? "show" : "hide"
                }
              >
                Silver
              </p>
              <img width={"35px"} src={silver} alt="league-logo" />
              <p
                style={{
                  transition: "all 0.3s linear",
                  position: "relative",
                  fontSize: "11px",
                  top: "0.5rem",
                  width: "150%",
                  opacity: "0",
                  color: "black",
                  display: league[leagueCategory] === 3 ? "block" : "none",
                }}
              >
                Silver League
              </p>
            </Tab>
            <Tab
              bgColor={"white"}
              padding={league[leagueCategory] === 4 ? "5px 20px" : "0"}
              isDisabled={league[leagueCategory] !== 4}
              className={league[leagueCategory] === 4 ? "active" : ""}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <p
                style={{
                  opacity: 0,
                  transition: "all 0.3s linear",
                  display:
                    league[leagueCategory] !== 4 && toolTip ? "block" : "none",
                }}
                className={
                  league[leagueCategory] !== 4 && toolTip ? "show" : "hide"
                }
              >
                Gold
              </p>
              <img width={"35px"} src={gold} alt="league-logo" />
              <p
                style={{
                  transition: "all 0.3s linear",
                  position: "relative",
                  fontSize: "11px",
                  top: "0.5rem",
                  width: "150%",
                  opacity: "0",
                  color: "black",
                  display: league[leagueCategory] === 4 ? "block" : "none",
                }}
              >
                Gold League
              </p>
            </Tab>
            <Tab
              bgColor={"white"}
              padding={league[leagueCategory] === 5 ? "5px 20px" : "0"}
              isDisabled={league[leagueCategory] !== 5}
              className={league[leagueCategory] === 5 ? "active" : ""}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <p
                style={{
                  opacity: 0,
                  transition: "all 0.3s linear",
                  display:
                    league[leagueCategory] !== 5 && toolTip ? "block" : "none",
                }}
                className={
                  league[leagueCategory] !== 5 && toolTip ? "show" : "hide"
                }
              >
                Diamond
              </p>
              <img width={"35px"} src={diamond} alt="league-logo" />
              <p
                style={{
                  transition: "all 0.3s linear",
                  position: "relative",
                  fontSize: "11px",
                  top: "0.5rem",
                  width: "150%",
                  opacity: "0",
                  color: "black",
                  display: league[leagueCategory] === 5 ? "block" : "none",
                }}
              >
                Diamond League
              </p>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </section>
    </div>
  );
};

import React, {useContext} from "react";
import {Container} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import {users} from "../assets/mock data/users";
import {useTranslation} from "react-i18next";
import {useLocation, useHistory} from "react-router-dom";

import {UserSearchContext} from "../data store/UserSearchStore";

import NotFound404 from "../components/404";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
    top: "60px",
    "& .search": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Users() {
  const location = useLocation();
  const history = useHistory();
  const [search, setSearch] = useContext(UserSearchContext);
  const {t} = useTranslation();
  const classes = useStyles();

  let user = location.search.split("Query=").reverse()[0];
  function handelQuery() {
    if (user) {
      setSearch(user);
    }
  }

  const inputValue = (e) => {
    setSearch(e.target.value);
    history.push(`/users?Query=${e.target.value}`);
  };

  let renderInfo;

  const renderUsers = users.map((item, index) => {
    if (search === "") {
      return (
        <div key={index} style={styles.usersContainer}>
          <div style={styles.h1Container}>
            <h1 style={styles.h1}>{`${item.firstName} ${item.lastName}`}</h1>
          </div>

          <div style={styles.imgContainer}>
            <img src={item.img} alt="ASD" style={styles.img} />
          </div>
        </div>
      );
    }

    if (item.firstName !== "" && item.firstName === search.toString()) {
      return (
        <div key={index} style={styles.usersContainer}>
          <div style={styles.h1Container}>
            <h1 style={styles.h1}>{`${item.firstName} ${item.lastName}`}</h1>
          </div>

          <div style={styles.imgContainer}>
            <img src={item.img} alt="ASD" style={styles.img} />
          </div>
        </div>
      );
    }

    return null;
  });

  if (renderUsers.every((value) => value === null)) {
    renderInfo = <NotFound404 />;
  } else {
    renderInfo = renderUsers;
  }

  return (
    <div onLoad={() => handelQuery()}>
      <form className={classes.root} noValidate autoComplete="off">
        <div className="search">
          <TextField
            id="filled-search"
            label={t("search the user")}
            type="search"
            variant="filled"
            value={search}
            onChange={(e) => inputValue(e)}
          />
        </div>
      </form>
      <Container style={{padding: "80px 0 50px 0"}}>{renderInfo}</Container>
    </div>
  );
}

const styles = {
  img: {
    position: "relative",
    top: "-40px",
    width: "200px",
    height: "200px",
    borderRadius: "100%",
  },
  imgContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  h1: {
    width: "220px",
    padding: "0 5px",
    position: "relative",
    top: "150px",
    left: "220px",
  },
  h1Container: {
    position: "relative",
    top: "-40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  usersContainer: {
    borderTop: "1px solid #666",
    borderBottom: "1px solid #666",
    borderLeft: "50px solid #333",
    borderRight: "50px solid #333",
  },
};

import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

function TicTacToe(props) {
  const [turnFor, setTurnFor] = useState("X");
  const [winner, setWinner] = useState();
  const [winType, setWinType] = useState();
  const [flatlistEnabled, setFlatlistEnabled] = useState(true);
  const [cells, setCells] = useState([
    { key: "1-1", value: null },
    { key: "1-2", value: null },
    { key: "1-3", value: null },
    { key: "2-1", value: null },
    { key: "2-2", value: null },
    { key: "2-3", value: null },
    { key: "3-1", value: null },
    { key: "3-2", value: null },
    { key: "3-3", value: null },
  ]);

  const resetCells = () => {
    setCells([
      { key: "1-1", value: null },
      { key: "1-2", value: null },
      { key: "1-3", value: null },
      { key: "2-1", value: null },
      { key: "2-2", value: null },
      { key: "2-3", value: null },
      { key: "3-1", value: null },
      { key: "3-2", value: null },
      { key: "3-3", value: null },
    ]);
    setTurnFor("X");

    setWinner(false);
    setFlatlistEnabled(true);
  };

  function validateTurn(object) {
    let list = cells;
    let objIndex = list.findIndex((obj) => obj.key == object.key);
    if (list[objIndex].value == null) {
      turnFor == "X" ? (list[objIndex].value = "X") : null;
      //: (list[objIndex].value = "O");
      setCells(list);
    }
    validateWinner();
    turnFor == "X" ? setTurnFor("O") : setTurnFor("X");
    changeTurn();
  }

  const changeTurn = () => {
    if (turnFor == "O") {
      let filteredValues = filter(cells);
      const random = Math.floor(Math.random() * filteredValues.length);

      let list = cells;
      let objIndex = list.findIndex(
        (obj) => obj.key == filteredValues[random].key
      );
      if (list[objIndex].value == null) list[objIndex].value = "O";
      setCells(list);
      setTurnFor("X");
    }

    validateWinner();
  };
  const validateWinner = () => {
    //Winner X rows
    if (checkWinner("1-1", "1-2", "1-3", "X")) return setWinType("r1");
    if (checkWinner("2-1", "2-2", "2-3", "X")) return setWinType("r2");
    if (checkWinner("3-1", "3-2", "3-3", "X")) return setWinType("r3");
    //Winner O rows
    if (checkWinner("1-1", "1-2", "1-3", "X")) return setWinType("r1");
    if (checkWinner("2-1", "2-2", "2-3", "X")) return setWinType("r2");
    if (checkWinner("3-1", "3-2", "3-3", "X")) return setWinType("r3");

    //Winner X columns
    if (checkWinner("1-1", "2-1", "3-1", "X")) return setWinType("c1");
    if (checkWinner("1-2", "2-2", "3-2", "X")) return setWinType("c2");
    if (checkWinner("1-3", "2-3", "3-3", "X")) return setWinType("c3");
    //Winner O columns
    if (checkWinner("1-1", "2-1", "3-1", "X")) return setWinType("c1");
    if (checkWinner("1-2", "2-2", "3-2", "X")) return setWinType("c2");
    if (checkWinner("1-3", "2-3", "3-3", "X")) return setWinType("c3");

    //Winner X diagonal
    if (checkWinner("1-1", "2-2", "3-3", "X")) return setWinType("d1");
    if (checkWinner("1-3", "2-2", "3-1", "X")) return setWinType("d2");
    //Winner O diagonal
    if (checkWinner("1-1", "2-2", "3-3", "X")) return setWinType("d1");
    if (checkWinner("1-3", "2-2", "3-1", "X")) return setWinType("d2");
  };
  const checkWinner = (obj1, obj2, obj3, filter) => {
    let objIndex1 = cells.findIndex((obj) => obj.key == obj1);
    let objIndex2 = cells.findIndex((obj) => obj.key == obj2);
    let objIndex3 = cells.findIndex((obj) => obj.key == obj3);
    if (
      (cells[objIndex1].value &&
        cells[objIndex2].value &&
        cells[objIndex3].value) == filter
    ) {
      setWinner(filter);
      console.log(winner);
      setFlatlistEnabled(false);
      return true;
    }
  };
  const filter = (arr) => {
    const required = arr.filter((el) => {
      return el.value == null;
    });
    return required;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.game}>
        <FlatList
          disabled={!flatlistEnabled}
          ListHeaderComponent={
            <Text style={styles.X}>{`The turn is for ` + turnFor}</Text>
          }
          style={{
            flex: 1,
            flexDirection: "column",
            margin: 3,
            backgroundColor: "pink",
          }}
          data={cells}
          keyExtractor={(message) => message.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.box}
              onPress={() => validateTurn(item)}
            >
              <Text style={styles.X}>{item.value}</Text>
            </TouchableOpacity>
          )}
          numColumns={3}
          ListFooterComponent={
            !flatlistEnabled && (
              <Text
                style={{
                  color: "blue",
                  fontSize: 30,
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                we have a winner, {winner} Wins
              </Text>
            )
          }
        />

        <TouchableOpacity style={{ height: 50 }} onPress={() => resetCells()}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            Reset / Play again
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  box: {
    backgroundColor: "grey",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    padding: 20,
  },
  game: {
    width: "80%",
    height: "60%",
    backgroundColor: "blue",
  },
  X: {
    width: "100%",
    height: "100%",
    color: "blue",
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  O: {
    width: "100%",
    height: "100%",
    color: "red",
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
});

export default TicTacToe;

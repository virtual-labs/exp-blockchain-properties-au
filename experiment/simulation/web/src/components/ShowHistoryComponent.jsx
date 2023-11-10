import React from "react";
import { useSelector } from "react-redux";
import StyledButton from "./StyledButton";
import BlockChain from "./threeComponents/BlockChainComponent";
import CustomizedTables from "../Table";
const ShowHistoryComponent = () => {
  const { showHistory, blockChainDetails } = useSelector(
    (state) => state.products
  );
  const [activeBtn, setActiveBtn] = React.useState("blockChain");
  const onHandleClick = (type) => {
    switch (type) {
      case "conventional":
        setActiveBtn("blockChain");
        break;
      case "blockChain":
        setActiveBtn("conventional");
        break;
      default:
        break;
    }
  };
  React.useEffect(() => {
    if (blockChainDetails.length === 0) {
      setActiveBtn("blockChain");
    }
  }, [blockChainDetails.length]);

  return (
    <div>
      {showHistory && (
        <div style={{ color: "white" }}>
          <div style={{ padding: 30 }}>
            <StyledButton
              disabled={activeBtn !== "blockChain"}
              children={"Conventional"}
              onClick={() => onHandleClick("conventional")}
            />
            <StyledButton
              disabled={activeBtn !== "conventional"}
              children={"BlockChain"}
              onClick={() => onHandleClick("blockChain")}
            />
          </div>

          {activeBtn !== "conventional" ? (
            <>
              <CustomizedTables />
            </>
          ) : (
            <BlockChain arr={blockChainDetails} />
          )}
        </div>
      )}
    </div>
  );
};

export default ShowHistoryComponent;

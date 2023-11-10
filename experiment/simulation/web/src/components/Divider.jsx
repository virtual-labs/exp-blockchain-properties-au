import React from "react";

const Divider = () => {
  return (
    <div
      style={{
        height: "6rem",
        display: "flex",
        justifyContent: "flex-start",
        paddingInline: 10,
      }}
    >
      <svg style={{ width: "100%" }}>
        <line
          x1={0}
          x2={150}
          y1={"50%"}
          y2={"50%"}
          fill="none"
          style={{
            stroke: "#22eff1",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        />
        <line
          x1={120}
          x2={150}
          y1={90}
          y2={50}
          fill="none"
          style={{
            stroke: "#22eff1",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        />

        <line
          x1={120}
          x2={290}
          y1={90}
          y2={90}
          fill="none"
          style={{
            stroke: "#22eff1",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        />
        <line
          x1={290}
          x2={330}
          y1={90}
          y2={50}
          fill="none"
          style={{
            stroke: "#22eff1",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        />
        <line
          x1={330}
          x2={"150%"}
          y1={50}
          y2={50}
          fill="none"
          style={{
            stroke: "#33c8cc",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        />
        <line
          x1={330}
          x2={"150%"}
          y1={55}
          y2={55}
          fill="none"
          style={{
            stroke: "#1bfaff",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        />
        <text
          style={{
            fontSize: 18,
            fontStyle: "normal",
            fill: "white",
          }}
          transform={"translate(160,70)"}
        >
          Online Shopping
        </text>
      </svg>
    </div>
  );
};

export default Divider;

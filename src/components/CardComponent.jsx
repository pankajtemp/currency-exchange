import React from "react";
import { Box, TextField } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

const CardComponent = (props) => {
  const [inputValue, setInputValue] = React.useState(1);

  const {
    identifier,
    from,
    to,
    lastUpdated,
    factor,
    currencyRatesLastUpdated,
    clickOnRefresh,
    clickOnCross,
    clickOnArrow
  } = props;
  return (
    <Box
      border="1px solid black"
      bgcolor="powderblue"
      borderRadius={1}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
    >
      <Box display="flex-column" justifyItems="space-between">
        <h5>{from}</h5>
        <Box my={1} display="flex" alignItems="center">
          <OpenInFullIcon
            onClick={() => clickOnArrow({ identifier, from, to, factor })}
            style={{ transform: "rotateY(180deg) rotate(-45deg)" }}
          />
          <p>{factor}</p>
        </Box>
        <h5>{to}</h5>
      </Box>
      <Box textAlign="right">
        <Box display="flex" justifyContent="flex-end">
          <RefreshOutlinedIcon
            onClick={() => clickOnRefresh({ identifier, from, to })}
          />
          <CloseOutlinedIcon onClick={() => clickOnCross({ identifier })} />
        </Box>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input value={Number(inputValue) * factor} disabled />
        <p>Last updated</p>
        <p>
          {lastUpdated?.toLocaleString("en-IN") ||
            currencyRatesLastUpdated.toLocaleString("en-IN")}
        </p>
      </Box>
    </Box>
  );
};

export default CardComponent;

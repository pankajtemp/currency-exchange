import React from "react";
import { Box, Grid, Button, Dialog, Select, MenuItem } from "@mui/material";

const ModalComponent = (props) => {
  const [newCard, setNewCard] = React.useState({ from: "", to: "" });

  const { open, currencyOptions, clickOnClose, clickOnAdd } = props;
  return (
    <Dialog
      maxWidth="xs"
      open={open}
      transitionDuration={{
        exit: 500,
        enter: 500
      }}
    >
      <Box p={2} borderRadius={2} bgcolor="#fff">
        <Box display="flex" mb={3} justifyContent="space-around">
          <Select
            id="stock-select"
            value={newCard.from}
            label="Stock"
            onChange={(e) =>
              setNewCard((prev) => {
                return { ...prev, from: e.target.value };
              })
            }
          >
            {currencyOptions
              .filter((currency) => currency !== newCard.to)
              .map((currency) => (
                <MenuItem value={currency}>{currency}</MenuItem>
              ))}
          </Select>
          <Select
            id="stock-select"
            value={newCard.to}
            label="Stock"
            onChange={(e) =>
              setNewCard((prev) => {
                return { ...prev, to: e.target.value };
              })
            }
          >
            {currencyOptions
              .filter((currency) => currency !== newCard.from)
              .map((currency) => (
                <MenuItem value={currency}>{currency}</MenuItem>
              ))}
          </Select>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              onClick={() => {
                clickOnClose();
                setNewCard({ from: "", to: "" });
              }}
              fullWidth
              variant="outlined"
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                clickOnAdd(newCard);
                setNewCard({ from: "", to: "" });
              }}
              disabled={!newCard.from || !newCard.to}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default ModalComponent;

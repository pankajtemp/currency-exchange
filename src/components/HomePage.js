import React from "react";
import { connect } from "react-redux";
import { Box, Grid, Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  getLatestRates,
  getLatestConversionRate,
  addCard,
  deleteCard,
  flipCard
} from "../actions";
import CardComponent from "./CardComponent";
import ModalComponent from "./ModalComponent";

function ProfileContainer(props) {
  React.useEffect(() => {
    const { actions } = props;
    actions.getLatestRates();
  }, [props]);

  const [criteria, setCriteria] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const {
    currencyOptions,
    currencyRatesLastUpdated,
    cardsList,
    actions
  } = props;
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box display="flex" flexWrap="wrap" justifyContent="flex-start">
          <Box
            borderRadius={1}
            bgcolor="aquamarine"
            border={criteria === "created" ? "1px solid black" : "none"}
            p={1}
            mr={1}
            mb={1}
            onClick={() => setCriteria("created")}
          >
            <h5>Sort by created</h5>
          </Box>
          <Box
            borderRadius={1}
            bgcolor="aquamarine"
            border={criteria === "factor" ? "1px solid black" : "none"}
            p={1}
            mr={1}
            mb={1}
            onClick={() => setCriteria("factor")}
          >
            <h5>Sort by rate</h5>
          </Box>
          <Box
            borderRadius={1}
            bgcolor="aquamarine"
            border={criteria === "identifier" ? "1px solid black" : "none"}
            p={1}
            mr={1}
            mb={1}
            onClick={() => setCriteria("identifier")}
          >
            <h5>Sort alphabetically</h5>
          </Box>
          <Box
            borderRadius={1}
            bgcolor="aquamarine"
            border={criteria === "lastUpdated" ? "1px solid black" : "none"}
            p={1}
            mr={1}
            mb={1}
            onClick={() => setCriteria("lastUpdated")}
          >
            <h5>Sort by last updated</h5>
          </Box>
        </Box>
        <Box
          textAlign="right"
          borderRadius={1}
          bgcolor="darkseagreen"
          p={1}
          onClick={() => actions.deleteCard({ allCards: true })}
        >
          <h5>Clear all</h5>
        </Box>
      </Box>
      <Box mt={2}>
        <Grid container spacing={1}>
          {cardsList
            .sort((card1, card2) =>
              criteria ? (card1[criteria] > card2[criteria] ? 1 : -1) : -1
            )
            .map((cardItem) => {
              return (
                <Grid item lg={4} md={6} xs={12} key={cardItem.identifier}>
                  {
                    <CardComponent
                      {...cardItem}
                      currencyRatesLastUpdated={currencyRatesLastUpdated}
                      clickOnRefresh={actions.getLatestConversionRate}
                      clickOnCross={actions.deleteCard}
                      clickOnArrow={actions.flipCard}
                    />
                  }
                </Grid>
              );
            })}
        </Grid>
      </Box>
      <Box mt={2} position="fixed" bottom="1rem" right="1rem">
        <Button
          style={{ width: "4rem", height: "4rem", borderRadius: "50%" }}
          variant="contained"
          onClick={() => setModalOpen(true)}
        >
          <AddOutlinedIcon />
        </Button>
      </Box>
      <ModalComponent
        open={modalOpen}
        clickOnClose={() => setModalOpen(false)}
        currencyOptions={currencyOptions}
        clickOnAdd={(newCard) => {
          if (
            cardsList.some(
              (cardItem) =>
                cardItem.identifier === newCard.from + "_" + newCard.to ||
                cardItem.identifier === newCard.to + "_" + newCard.from
            )
          ) {
            alert("Card already exists");
            return;
          }
          actions.addCard(newCard);
          setModalOpen(false);
        }}
      />
    </Box>
  );
}

const mapStateToProps = (state) => ({
  currencyOptions: state.rateData.currencyOptions,
  currencyRatesLastUpdated: state.rateData.lastUpdated,
  cardsList: state.cardData,
  loading: state.httpData.httpCallInProgress
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    getLatestRates: () => dispatch(getLatestRates()),
    getLatestConversionRate: (payload) =>
      dispatch(getLatestConversionRate(payload)),
    addCard: (payload) => dispatch(addCard(payload)),
    deleteCard: (payload) => dispatch(deleteCard(payload)),
    flipCard: (payload) => dispatch(flipCard(payload))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

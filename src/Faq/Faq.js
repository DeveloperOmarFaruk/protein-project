import React, { useState } from "react";
import "./Faq.css";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";

import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{ fontSize: "0.9rem", visibility: "hidden" }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const Faq = () => {
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="faq-section">
        <div className="faq-container">
          <div className="faq-header">
            <h4>Frequently Asked Questions</h4>
          </div>

          <div className="row faq-body-container">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 faq-body-container-col">
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  sx={{ margin: "0rem 0rem" }}
                  className="faq-body-container-info-question-div"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <Typography className="web-category-healine-title faq-body-container-info-question">
                    How is ProteinWriter different?
                  </Typography>

                  <IconButton
                    aria-label="expand"
                    size="large"
                    className="web-category-healine-icon-btn"
                  >
                    {expanded === "panel1" ? (
                      <RemoveIcon sx={{ color: "#fd3f6d" }} />
                    ) : (
                      <AddIcon />
                    )}
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="faq-body-container-info-answer">
                    We offer you a simple way to speed up designing a new
                    protein by tweaking an old one. With our protein-specific
                    design engine, your new protein is optimized to perform in
                    the same organism as the original protein.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  sx={{ margin: "0rem 0rem" }}
                  className="faq-body-container-info-question-div"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <Typography className=" faq-body-container-info-question">
                    Why is it important to optimize my protein design?
                  </Typography>

                  <IconButton
                    aria-label="expand"
                    size="large"
                    className="web-category-healine-icon-btn"
                  >
                    {expanded === "panel2" ? (
                      <RemoveIcon sx={{ color: "#fd3f6d" }} />
                    ) : (
                      <AddIcon />
                    )}
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="faq-body-container-info-answer">
                    First, optimizing means there is no need to search for an
                    organism to host your protein. Second, it best ensures your
                    new protein will perform in the same organism as the
                    original protein. Third, optimizing helps you to devote more
                    time to the practical applications of your new protein.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  sx={{ margin: "0rem 0rem" }}
                  className="faq-body-container-info-question-div"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <Typography className=" faq-body-container-info-question">
                    Not sure I understand Regions. What are they?
                  </Typography>

                  <IconButton
                    aria-label="expand"
                    size="large"
                    className="web-category-healine-icon-btn"
                  >
                    {expanded === "panel3" ? (
                      <RemoveIcon sx={{ color: "#fd3f6d" }} />
                    ) : (
                      <AddIcon />
                    )}
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="faq-body-container-info-answer">
                    A Region is a group of positions and matching substitutes in
                    a protein platform. There may be up to 19 regions but the
                    exact number is different for each protein platform. Regions
                    are ranked according to their degree of optimization with
                    Region one being the highest and Region 19 being the lowest.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel4"}
                onChange={handleChange("panel4")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  sx={{ margin: "0rem 0rem" }}
                  className="faq-body-container-info-question-div"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <Typography className=" faq-body-container-info-question">
                    What is Ag?
                  </Typography>

                  <IconButton
                    aria-label="expand"
                    size="large"
                    className="web-category-healine-icon-btn"
                  >
                    {expanded === "panel4" ? (
                      <RemoveIcon sx={{ color: "#fd3f6d" }} />
                    ) : (
                      <AddIcon />
                    )}
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="faq-body-container-info-answer">
                    Ag is a unit of optimization. It gives you a precise way to
                    compare the substitutes of amino acids in a protein
                    platform.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel5"}
                onChange={handleChange("panel5")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  sx={{ margin: "0rem 0rem" }}
                  className="faq-body-container-info-question-div"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <Typography className=" faq-body-container-info-question">
                    What is the difference between a protein and a protein
                    platform?
                  </Typography>

                  <IconButton
                    aria-label="expand"
                    size="large"
                    className="web-category-healine-icon-btn"
                  >
                    {expanded === "panel5" ? (
                      <RemoveIcon sx={{ color: "#fd3f6d" }} />
                    ) : (
                      <AddIcon />
                    )}
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="faq-body-container-info-answer">
                    None, really. A protein platform is a protein used to be
                    redesigned into a new protein.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel6"}
                onChange={handleChange("panel6")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  sx={{ margin: "0rem 0rem" }}
                  className="faq-body-container-info-question-div"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <Typography className=" faq-body-container-info-question">
                    What if I only want to do protein research?
                  </Typography>

                  <IconButton
                    aria-label="expand"
                    size="large"
                    className="web-category-healine-icon-btn"
                  >
                    {expanded === "panel6" ? (
                      <RemoveIcon sx={{ color: "#fd3f6d" }} />
                    ) : (
                      <AddIcon />
                    )}
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="faq-body-container-info-answer">
                    Our protein design engine simplifies your protein research.
                    First, it helps you to understand the roles of amino acids
                    at specific positions in a protein. Second, it will show you
                    the positions and amino acid substitutes optimized to create
                    a new protein design.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel7"}
                onChange={handleChange("panel7")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  sx={{ margin: "0rem 0rem" }}
                  className="faq-body-container-info-question-div"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <Typography className=" faq-body-container-info-question">
                    What difference does it make if I have position-specific
                    protein research?
                  </Typography>

                  <IconButton
                    aria-label="expand"
                    size="large"
                    className="web-category-healine-icon-btn"
                  >
                    {expanded === "panel7" ? (
                      <RemoveIcon sx={{ color: "#fd3f6d" }} />
                    ) : (
                      <AddIcon />
                    )}
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="faq-body-container-info-answer">
                    Your position-specific protein research can help you to
                    speed up your protein design. In your ProteinLab, simply
                    open the protein platform which matches your research
                    protein. Then, select the optimized positions and amino acid
                    substitutes to create your new protein design.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel8"}
                onChange={handleChange("panel8")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  sx={{ margin: "0rem 0rem" }}
                  className="faq-body-container-info-question-div"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <Typography className=" faq-body-container-info-question">
                    Is ProteinWriter supported by experimental validation?
                  </Typography>

                  <IconButton
                    aria-label="expand"
                    size="large"
                    className="web-category-healine-icon-btn"
                  >
                    {expanded === "panel8" ? (
                      <RemoveIcon sx={{ color: "#fd3f6d" }} />
                    ) : (
                      <AddIcon />
                    )}
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="faq-body-container-info-answer">
                    The simple answer is "no". Of course, we recognize the
                    importance of experimental validation. For this reason, we
                    offer a free Designer level Protein platform to all our new
                    designers. We are confident this open offer will lead to
                    experimental validation from multiple unaffiliated sources.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel9"}
                onChange={handleChange("panel9")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  sx={{ margin: "0rem 0rem" }}
                  className="faq-body-container-info-question-div"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <Typography className=" faq-body-container-info-question">
                    What is your refund policy?
                  </Typography>

                  <IconButton
                    aria-label="expand"
                    size="large"
                    className="web-category-healine-icon-btn"
                  >
                    {expanded === "panel9" ? (
                      <RemoveIcon sx={{ color: "#fd3f6d" }} />
                    ) : (
                      <AddIcon />
                    )}
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="faq-body-container-info-answer">
                    Our refund policy is designed to inspire confidence in our
                    protein design service. We offer a free Designer level
                    Protein platform to all our new protein designers. This open
                    offer gives you a risk-free opportunity to design multiple
                    proteins and to see if our protein design service is a fit
                    for you. We encourage you to take full advantage of it.
                    <br /> <br />
                    Considering the inability to physically return an electronic
                    product, we do not offer a refund at this time. As an
                    exception, we gladly offer a 30-day money back guarantee,
                    for any reason, to members of our ProteinWriter loyalty
                    program.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>

            {/* <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 faq-body-container-col">
              <Accordion
                expanded={expanded === "panel6"}
                onChange={handleChange("panel6")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  sx={{ margin: "0rem 0rem" }}
                  className="faq-body-container-info-question-div"
                >
                  <Typography className=" faq-body-container-info-question">
                    What if I only want to do protein research?
                  </Typography>

                  <IconButton
                    aria-label="expand"
                    size="large"
                    className="web-category-healine-icon-btn"
                  >
                    {expanded === "panel6" ? (
                      <RemoveIcon sx={{ color: "#fd3f6d" }} />
                    ) : (
                      <AddIcon />
                    )}
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="faq-body-container-info-answer">
                    Our protein design engine simplifies your protein research.
                    First, it helps you to understand the roles of amino acids
                    at specific positions in a protein. Second, it will show you
                    the positions and amino acid substitutes optimized to create
                    a new protein design.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel7"}
                onChange={handleChange("panel7")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  sx={{ margin: "0rem 0rem" }}
                  className="faq-body-container-info-question-div"
                >
                  <Typography className=" faq-body-container-info-question">
                    What difference does it make if I have position-specific
                    protein research?
                  </Typography>

                  <IconButton
                    aria-label="expand"
                    size="large"
                    className="web-category-healine-icon-btn"
                  >
                    {expanded === "panel7" ? (
                      <RemoveIcon sx={{ color: "#fd3f6d" }} />
                    ) : (
                      <AddIcon />
                    )}
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="faq-body-container-info-answer">
                    Your position-specific protein research can help you to
                    speed up your protein design. In your ProteinLab, simply
                    open the protein platform which matches your research
                    protein. Then, select the optimized positions and amino acid
                    substitutes to create your new protein design.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel8"}
                onChange={handleChange("panel8")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  sx={{ margin: "0rem 0rem" }}
                  className="faq-body-container-info-question-div"
                >
                  <Typography className=" faq-body-container-info-question">
                    Is ProteinWriter supported by experimental validation?
                  </Typography>

                  <IconButton
                    aria-label="expand"
                    size="large"
                    className="web-category-healine-icon-btn"
                  >
                    {expanded === "panel8" ? (
                      <RemoveIcon sx={{ color: "#fd3f6d" }} />
                    ) : (
                      <AddIcon />
                    )}
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="faq-body-container-info-answer">
                    The simple answer is "no". Of course, we recognize the
                    importance of experimental validation. For this reason, we
                    offer a free Designer level Protein platform to all our new
                    designers. We are confident this open offer will lead to
                    experimental validation from multiple unaffiliated sources.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel9"}
                onChange={handleChange("panel9")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  sx={{ margin: "0rem 0rem" }}
                  className="faq-body-container-info-question-div"
                >
                  <Typography className=" faq-body-container-info-question">
                    What is your refund policy?
                  </Typography>

                  <IconButton
                    aria-label="expand"
                    size="large"
                    className="web-category-healine-icon-btn"
                  >
                    {expanded === "panel9" ? (
                      <RemoveIcon sx={{ color: "#fd3f6d" }} />
                    ) : (
                      <AddIcon />
                    )}
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="faq-body-container-info-answer">
                    Our refund policy is designed to inspire confidence in our
                    protein design service. We offer a free Designer level
                    Protein platform to all our new protein designers. This open
                    offer gives you a risk-free opportunity to design multiple
                    proteins and to see if our protein design service is a fit
                    for you. We encourage you to take full advantage of it.
                    <br /> <br />
                    Considering the inability to physically return an electronic
                    product, we do not offer a refund at this time. As an
                    exception, we gladly offer a 30-day money back guarantee,
                    for any reason, to members of our ProteinWriter loyalty
                    program.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div> */}
          </div>

          <div className="faq-question-answer-div-btn">
            <button onClick={() => navigate("/signin")}>
              Start designing <span>free!</span>
            </button>

            <button onClick={() => navigate("/protein-design")}>
              Shop all proteins
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;

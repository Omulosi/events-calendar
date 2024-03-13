import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { H1, Paragraph } from "@components/Typography";
import { CarouselProvider, DotGroup, Slide, Slider } from "pure-react-carousel";

const lightTheme = (theme) => theme.palette.mode === "light";

const StyledProvider = styled(CarouselProvider)(({ theme }) => ({
  outline: 0,
  padding: 24,
  height: "100%",
  display: "flex",
  overflow: "hidden",
  position: "relative",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: lightTheme(theme) ? theme.palette.grey[300] : theme.palette.background.paper,
  "& .focusRing___1airF.carousel__slide-focus-ring": {
    outline: "none !important",
  },
}));

const StyledDotGroup = styled(DotGroup)(({ theme }) => ({
  gap: 5,
  display: "flex",
  textAlign: "center",
  "& .dot___3c3SI.carousel__dot": {
    border: 0,
    width: 10,
    height: 10,
    borderRadius: "50%",
    transition: "all 0.3s",
    backgroundColor: theme.palette.grey[600],
  },
  "& .dot___3c3SI.carousel__dot--selected": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const ContentSlider = () => {
  return (
    <StyledProvider
      isPlaying
      totalSlides={1}
      naturalSlideWidth={100}
      naturalSlideHeight={125}
      currentSlide={0}
      isIntrinsicHeight
      dragEnabled={false}
    >
      <Slider>
        <Slide index={0}>
          <SlideComponent
            img="/assets/illustrations/login-1.svg"
            title="Events Calendar"
            descripiton="A time management and scheduling calendar"
          />
        </Slide>
      </Slider>

      <StyledDotGroup />
    </StyledProvider>
  );
};

export default ContentSlider;

function SlideComponent({ img, title, descripiton }) {
  return (
    <Box
      sx={{
        padding: 4,
        textAlign: "center",
      }}
    >
      <img
        alt="slide"
        src={img}
        style={{
          maxWidth: 300,
        }}
      />
      <H1 fontWeight={700} mt={3}>
        {title}
      </H1>
      <Paragraph>{descripiton}</Paragraph>
    </Box>
  );
}

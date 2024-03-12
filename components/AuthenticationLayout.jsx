"use client";
import { Grid, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/system";
import { H1, Paragraph } from "@components/Typography";
import Link from "next/link";
import ContentSlider from "@components/ContentSlider";

const AuthenticationLayout = (props) => {
  const { children, title, route, routeName, description } = props;
  const downMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Grid container height="100vh" sx={{ height: "100vh", overflow: "hidden" }}>
      <Grid item md={6} xs={12} order={downMd ? 2 : 1}>
        <ContentSlider />
      </Grid>

      <Grid item md={6} xs={12} order={downMd ? 1 : 2}>
        <Stack alignItems="center" justifyContent="center" height="100%">
          <Box width={120}>
            <img src="/assets/images/logo.svg" alt="logo" width="100%" />
          </Box>
          <Box maxWidth={550} width="100%" padding={2}>
            <Box>{children}</Box>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AuthenticationLayout;

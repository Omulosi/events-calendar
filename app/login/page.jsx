"use client";
import {
  Button,
  ButtonBase,
  Divider,
  Stack,
  styled,
  Card,
  Box,
  FormControlLabel,
  FormHelperText,
  Switch,
} from "@mui/material";
import AppCheckBox from "@components/AppCheckBox";
import FlexBetween from "@components/flexbox/FlexBetween";
import FlexBox from "@components/flexbox/FlexBox";
import AppTextField from "@components/AppTextField";
import { Small } from "@components/Typography";
import AuthenticationLayout from "@components/AuthenticationLayout";
import FlexRowAlign from "@components/flexbox/FlexRowAlign";
import Logo from "@components/Logo";
import Link from "next/link";
import { H1, H3 } from "@components/Typography";
import Image from "next/image";

export const TextFieldWrapper = styled(Box)(({ theme }) => ({
  width: "48%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginTop: "0.5rem",
  },
}));

const StyledButton = styled(ButtonBase)(({ theme }) => ({
  width: "100%",
  padding: 12,
  marginBottom: 16,
  borderRadius: "8px",
  fontWeight: "500",
  border: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down(454)]: {
    width: "100%",
    marginBottom: 8,
  },
}));

const Login = () => {
  const handleSubmit = () => {};

  return (
    <AuthenticationLayout route="/" description="" title="" routeName="">
      <form>
        <Stack gap={2} mt={5}>
          <AppTextField fullWidth label="Email" />

          <FlexBetween>
            <FlexBox alignItems="center" gap={1}>
              <AppCheckBox defaultChecked />
              <Small fontSize={12}>Remember me</Small>
            </FlexBox>

            <Button
              disableRipple
              sx={{
                color: "error.main",
                mb: 2,
              }}
            >
              Forget Password
            </Button>
          </FlexBetween>

          <Button variant="contained" fullWidth type="submit" size="large">
            Sign In
          </Button>
        </Stack>
      </form>
    </AuthenticationLayout>
  );
};

export default Login;

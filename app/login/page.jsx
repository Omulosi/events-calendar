"use client";
import { Box, Button, Card, Divider, Stack, FormHelperText, TextField } from "@mui/material";
import FlexBetween from "@components/flexbox/FlexBetween";
import FlexRowAlign from "@components/flexbox/FlexRowAlign";
import AppTextField from "@components/AppTextField";
import { CircularProgress } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

import { H1, H3, Paragraph, Small } from "components/Typography";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Image from "next/image";
import { redirect } from "next/navigation";

import { bgGradient } from "@theme/css";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const theme = useTheme();
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  const router = useRouter();

  const initialValues = {
    email: "",
  }; // form field value validation schema

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
  });

  const { errors, values, touched, handleBlur, handleChange, handleSubmit, isSubmitting } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log({ values });
      const { email } = values;
      signIn("credentials", { email, callbackUrl: `${window.location.origin}/` });
      router.push("/");
    },
  });
  return (
    <Box
      sx={{
        margin: 0,
        padding: 0,
        height: "100vh",
        backgroundColor: "#eee",
      }}
    >
      <Box width={60} mt={1} sx={{ cursor: "pointer" }}>
        <Image src="/assets/images/logo.jpg" alt="logo" width={60} height={60} className="object-contain" />
      </Box>
      <FlexRowAlign
        flexDirection="column"
        sx={{
          height: {
            sm: "100%",
          },
        }}
      >
        <Card
          sx={{
            padding: 4,
            maxWidth: 700,
            boxShadow: 1,
            width: "25%",
          }}
        >
          <FlexRowAlign flexDirection="column" mb={5}>
            <Box width={50} mb={1}>
              <Image src="/assets/images/logo.jpg" alt="logo" width={50} height={50} className="object-contain" />
            </Box>
            <H1 fontSize={24} fontWeight={700}>
              Sign In
            </H1>
          </FlexRowAlign>

          <FlexBetween flexWrap="wrap" my="1rem">
            <form
              noValidate
              onSubmit={handleSubmit}
              style={{
                width: "100%",
              }}
            >
              <Stack gap={1}>
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  label="Email"
                  size="medium"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email || ""}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{
                    mb: {
                      xs: 1,
                    },
                  }}
                />
              </Stack>

              {error && (
                <FormHelperText
                  error
                  sx={{
                    mt: 2,
                    fontSize: 13,
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  {error}
                </FormHelperText>
              )}

              <Box
                sx={{
                  mt: 4,
                }}
              >
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  style={{ backgroundColor: "#2c3e50", color: "#fff" }}
                  endIcon={isSubmitting ? <CircularProgress color="inherit" size={25} /> : null}
                >
                  Sign In
                </Button>
              </Box>
            </form>
          </FlexBetween>
        </Card>
      </FlexRowAlign>
    </Box>
  );
};

export default Login;

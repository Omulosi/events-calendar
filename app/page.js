"use client";
import { Box, Button, Card, Divider, Stack, FormHelperText, TextField } from "@mui/material";
import FlexBetween from "@components/flexbox/FlexBetween";
import FlexRowAlign from "@components/flexbox/FlexRowAlign";
import AppCheckBox from "@components/AppCheckBox";
import FlexBox from "@components/flexbox/FlexBox";
import { Small } from "@components/Typography";
import AuthenticationLayout from "@components/AuthenticationLayout";
import { CircularProgress } from "@mui/material";
import { H1 } from "components/Typography";
import AppTextField from "@components/AppTextField";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
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
      signIn("credentials", { email, callbackUrl: `${window.location.origin}/calendar` });
      router.push("/");
    },
  });

  return (
    <AuthenticationLayout route="/" description="" title="" routeName="">
      <form onSubmit={handleSubmit}>
        <Stack gap={2} mt={5}>
          <AppTextField
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

          <Button fullWidth variant="contained" type="submit" size="large">
            {isSubmitting ? "Loading..." : "Sign In"}
          </Button>
        </Stack>
      </form>
    </AuthenticationLayout>
  );

  return (
    <Box
      sx={{
        margin: 0,
        padding: 0,
        height: "100vh",
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
            maxWidth: 500,
            boxShadow: 1,
            width: "90%",
            backgroundColor: "#fff",
            border: "1px solid rgba(200,200,200, 0.4)",
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

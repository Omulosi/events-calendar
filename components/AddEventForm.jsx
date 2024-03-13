import { Button, Grid, IconButton, Stack, useMediaQuery, FormHelperText } from "@mui/material";
import { Box } from "@mui/system";
import Scrollbar from "@components/ScrollBar";
import { H5 } from "@components/Typography";
import AppTextField from "@components/AppTextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";

const AddEventForm = ({ handleCancel, eventDetails }) => {
  const downSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const { data: session } = useSession();

  const router = useRouter();

  const { mutate } = useSWRConfig();

  const [error, setError] = useState(null);

  const initialValues = {
    title: "",
    description: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required(),
    description: Yup.string(),
  });

  const { values, errors, handleSubmit, handleChange, handleBlur, touched, isSubmitting } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        let calendarApi = eventDetails.view.calendar;
        calendarApi.unselect(); // clear date selection

        const newEvent = {
          id: uuidv4(),
          title: values.title,
          description: values.description,
          start: eventDetails.startStr,
          end: eventDetails.endStr,
          allDay: eventDetails.allDay,
          userId: session?.user.id,
        };

        calendarApi.addEvent(newEvent);

        const response = await fetch("/api/event/new", {
          method: "POST",
          body: JSON.stringify({
            title: newEvent.title,
            description: newEvent.description,
            start: newEvent.start,
            end: newEvent.end,
            allDay: newEvent.allDay,
            userId: session?.user.id,
          }),
        });

        if (response.ok) {
          // Close modal
          // router.push("/calendar");
          // mutate("/api/event");
          const userId = session?.user?.id;
          mutate(`/api/event?user=${userId}`);
          handleCancel();
        }
      } catch (error) {
        setError(error?.message);
        console.log({ error });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box p={2}>
      <H5 mb={4}>Add Event</H5>
      <form onSubmit={handleSubmit}>
        <Scrollbar
          autoHide={false}
          style={{
            maxHeight: downSm ? 300 : "",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <AppTextField
                fullWidth
                name="title"
                label="Title"
                variant="outlined"
                onBlur={handleBlur}
                value={values.title}
                onChange={handleChange}
                error={Boolean(errors.title && touched.title)}
                helperText={touched.title && errors.title}
              />
            </Grid>

            <Grid item xs={12}>
              <AppTextField
                multiline
                rows={5}
                fullWidth
                name="description"
                label="Description"
                variant="outlined"
                onBlur={handleBlur}
                value={values.description}
                onChange={handleChange}
                error={Boolean(errors.description && touched.description)}
                helperText={touched.description && errors.description}
              />
            </Grid>
          </Grid>
        </Scrollbar>

        <FormHelperText sx={{ marginTop: 2 }} error>
          {error && error}
        </FormHelperText>

        <Stack direction="row" spacing={1} mt={4}>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "..." : "Save"}
          </Button>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddEventForm;

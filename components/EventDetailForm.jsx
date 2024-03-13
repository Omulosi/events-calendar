import { Button, Grid, IconButton, Stack, useMediaQuery, FormHelperText } from "@mui/material";
import { Box } from "@mui/system";
import Scrollbar from "@components/ScrollBar";
import { H2, H5, Small, Tiny } from "@components/Typography";
import AppTextField from "@components/AppTextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";
import useEvent from "@hooks/useEvent";
import dayjs from "dayjs";
import EventNoteIcon from "@mui/icons-material/EventNote";
import FlexBox from "@components/flexbox/FlexBox";

const EventDetailForm = ({ handleCancel, eventId }) => {
  const downSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const { data: session } = useSession();

  const userId = session?.user?.id;

  const router = useRouter();

  const { mutate } = useSWRConfig();

  const { event: data, error: eventError, isLoading } = useEvent({ id: eventId });

  console.log({ userId });

  const [error, setError] = useState(null);

  const initialValues = {
    title: data?.title ?? "",
    description: data?.description ?? "",
    start: data?.start ?? "",
    end: data?.end ?? "",
    allDay: data?.allDay ?? "",
  };

  // const validationSchema = Yup.object({
  //   title: Yup.string(),
  //   description: Yup.string(),
  // });

  const { values, errors, handleSubmit, handleChange, handleBlur, touched, isSubmitting } = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log({ values });
        // let calendarApi = eventDetails.view.calendar;
        // calendarApi.unselect(); // clear date selection
        // const newEvent = {
        //   id: uuidv4(),
        //   title: values.title,
        //   description: values.description,
        //   start: eventDetails.startStr,
        //   end: eventDetails.endStr,
        //   allDay: eventDetails.allDay,
        //   userId: session?.user.id,
        // };
        // calendarApi.addEvent(newEvent);
        const response = await fetch(`/api/event/${eventId}`, {
          method: "PATCH",
          body: JSON.stringify({
            ...values,
          }),
        });

        if (response.ok) {
          mutate(`/api/event/${eventId}`);
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
    <Box key={eventId}>
      <H5 mb={4}>Event Details</H5>
      <form onSubmit={handleSubmit} key={data}>
        <Scrollbar
          autoHide={false}
          style={{
            maxHeight: downSm ? 300 : "",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} mt={1}>
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

            <Grid item xs={12}>
              <FlexBox alignItems="center">
                <EventNoteIcon sx={{ color: "text.disabled" }} />
                <Small color="text.disabled">
                  {dayjs(values?.start).format("dddd, MMMM D ")} - {dayjs(values?.end).format("dddd, MMMM D ")}
                </Small>
              </FlexBox>
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

export default EventDetailForm;

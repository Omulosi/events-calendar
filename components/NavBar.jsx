import { Badge, Box, ButtonBase, Divider, styled, useTheme, Modal } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AppAvatar from "components/AppAvatar";
import FlexBox from "components/FlexBox";
import { H6, Small, Tiny } from "components/Typography";
import { useRef, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import PopoverLayout from "./PopoverLayout";
import { H2 } from "./Typography";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
  padding: 5,
  marginLeft: 4,
  borderRadius: 30,
  border: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledSmall = styled(Small)(({ theme }) => ({
  display: "block",
  cursor: "pointer",
  padding: "5px 1rem",
}));

const NavBar = () => {
  const theme = useTheme();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { data: session, status } = useSession();

  const user = session?.user;

  return (
    <Box sx={{ padding: 2, display: "flex", width: "100%", alignItems: "center", justifyContent: "flex-end" }}>
      <Box sx={{ flex: 1 }}>
        <Link href="/" className="flex gap-2 flex-center">
          <Image src="/assets/images/logo.jpg" alt="logo" width={50} height={50} className="object-contain" />
          <H2 className="logo_text">Events Calendar</H2>
        </Link>
      </Box>
      <div>
        {session ? (
          <StyledButtonBase disableRipple ref={anchorRef} onClick={() => setOpen(true)}>
            <Badge
              overlap="circular"
              variant="dot"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              sx={{
                alignItems: "center",
                "& .MuiBadge-badge": {
                  width: 11,
                  height: 11,
                  right: "4%",
                  borderRadius: "50%",
                  border: "2px solid #fff",
                  backgroundColor: "success.main",
                },
              }}
            >
              <Small mx={1} color="text.secondary">
                <Small fontWeight="600" display="inline">
                  {user?.email || ""}
                </Small>
              </Small>

              <AppAvatar
                src={user?.avatar || "/static/avatar/001-man.svg"}
                sx={{
                  width: 28,
                  height: 28,
                }}
              />
            </Badge>
          </StyledButtonBase>
        ) : (
          <Box
            mr={2}
            sx={{
              cursor: "pointer",
              padding: 1,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
            onClick={() => router.push("/login")}
          >
            <span>Sign in</span>
          </Box>
        )}

        <PopoverLayout
          hiddenViewButton
          maxWidth={250}
          minWidth={200}
          popoverOpen={open}
          anchorRef={anchorRef}
          popoverClose={() => setOpen(false)}
          title={
            <FlexBox alignItems="center" gap={1}>
              <AppAvatar
                src={"/static/avatar/001-man.svg"}
                sx={{
                  width: 35,
                  height: 35,
                }}
              />

              <Box>
                <H6>{user?.name || ""}</H6>
                <Tiny display="block" fontWeight={500} color="text.disabled">
                  {user?.email || ""}
                </Tiny>
              </Box>
            </FlexBox>
          }
        >
          <Box
            pt={1}
            pl={2}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
            onClick={() => {
              signOut({ callbackUrl: `${window.location.origin}/login` });
            }}
          >
            <LogoutIcon
              sx={{
                color: "text.disabled",
                fontSize: 20,
              }}
            />
            <StyledSmall>Sign Out</StyledSmall>
          </Box>
        </PopoverLayout>
      </div>
    </Box>
  );
};

export default NavBar;

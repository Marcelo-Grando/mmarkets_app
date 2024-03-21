import { Box } from "@mui/material"

const alturaViewport = window.innerHeight; 

export default function ScrollBox(props) {
  return (
    <Box sx={{display: "flex", flexWrap:"wrap", paddingInline: 1, justifyContent: "space-between", height: alturaViewport - 70,overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.5em",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.5)",
    },
    "&::-webkit-scrollbar-corner": {
      backgroundColor: "#fff",
    },}}>{props.children}</Box>
  )
}

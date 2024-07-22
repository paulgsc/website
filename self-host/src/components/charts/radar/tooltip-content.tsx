// const getIntroOfPage = (label) => {
//   if (label === "Page A") {
//     return "Page A is about men's clothing"
//   }
//   if (label === "Page B") {
//     return "Page B is about women's dress"
//   }
//   if (label === "Page C") {
//     return "Page C is about women's bag"
//   }
//   if (label === "Page D") {
//     return "Page D is about household goods"
//   }
//   if (label === "Page E") {
//     return "Page E is about food"
//   }
//   if (label === "Page F") {
//     return "Page F is about baby food"
//   }
//   return ""
// }

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="custom-tooltip">
//         <p className="label">{`${label} : ${payload[0].value}`}</p>
//         <p className="intro">{getIntroOfPage(label)}</p>
//         <p className="desc">Anything you want can be displayed here.</p>
//       </div>
//     )
//   }

//   return null
// }

// export default CustomTooltip

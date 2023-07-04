import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row(props: { row: any }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.grandprix}
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.sumPts}</TableCell>
                <TableCell>{row.accumPts}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Team's driver(s) racing results
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: "bold" }}>Driver</TableCell>
                                        <TableCell style={{ fontWeight: "bold" }}>Pos</TableCell>
                                        <TableCell style={{ fontWeight: "bold" }}>Pts</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.driverInfos.map((driverPartiRow: any) => (
                                        <TableRow key={driverPartiRow.fullname}>
                                            <TableCell component="th" scope="row">
                                                {driverPartiRow.fullname}
                                            </TableCell>
                                            <TableCell>{driverPartiRow.pos}</TableCell>
                                            <TableCell>{driverPartiRow.points}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable(props: any) {
    const rows = props.rows
    console.log(rows)
    const originalOneTargetArr = props.oneTarget.target
    console.log(originalOneTargetArr)
    let oneTargetArr = []
    if (originalOneTargetArr) {
        for (let i = 0; i < originalOneTargetArr.length; i++) {
            const firstname = originalOneTargetArr[i].driver[0].firstname
            const lastname = originalOneTargetArr[i].driver[0].lastname
    
            oneTargetArr.push({
                driver: `${firstname} ${lastname}`,
                nationality: originalOneTargetArr[i].driver[0].nationality,
                sumPts: originalOneTargetArr[i].sumPoints,
                percentage: originalOneTargetArr[i].percentage
            })
        }
        console.log("oneTargetsArr is", oneTargetArr)
    }
    

    return (
        <div>
            <div>
                {oneTargetArr.length === 0 ? <></> :
                    <div>
                        {oneTargetArr.map((driver: any, index) => (
                            <p>
                                <span key={index}>
                                DRIVER: {driver.driver} |
                                NATIONALITY: {driver.nationality} |
                                SUMPTS: {driver.sumPts} |
                                PERCENTAGE: {driver.percentage}
                                </span>
                            </p>
                            )
                        )}
                    </div>}
            </div>
            <div className="centered-div">

                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ background: "lightblue", fontWeight: "bold" }}>DRIVER PTS</TableCell>
                                <TableCell style={{ background: "lightblue", fontWeight: "bold" }}>GRANDPRIX </TableCell>
                                <TableCell style={{ background: "lightblue", fontWeight: "bold" }}>DATE</TableCell>
                                <TableCell style={{ background: "lightblue", fontWeight: "bold" }}>SUMPTS</TableCell>
                                <TableCell style={{ background: "lightblue", fontWeight: "bold" }}>ACCUMPTS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row: any, index: number) => (
                                <Row key={index} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

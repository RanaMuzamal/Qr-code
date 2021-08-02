import { TableCell, TableRow } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';

export default function UserDetail({ userData }) {
    return <Paper elevation={4} style={{marginTop:15}}>
        <Table>
            <TableRow>
                <TableCell>Display Name </TableCell>
                <TableCell>{userData?.displayName || "N/A"} </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Given Name </TableCell>
                <TableCell> {userData?.givenName || "N/A"} </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Surname </TableCell>
                <TableCell>{userData?.surname || "N/A"} </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Job Title </TableCell>
                <TableCell> {userData?.jobTitle || "N/A"}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Mail </TableCell>
                <TableCell> {userData?.mail || "N/A"} </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Mobile Phone</TableCell>
                <TableCell>{userData?.businessPhones[0] || "N/A"} </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Office Phone </TableCell>
                <TableCell>{userData?.officePhone || "N/A"} </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Office Location </TableCell>
                <TableCell>{userData?.officeLocation || "N/A"} </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Preferred Language </TableCell>
                <TableCell>{userData?.preferredLanguage || "N/A"} </TableCell>
            </TableRow>
        </Table>
    </Paper>
}
import { TableCell, TableRow,TableBody } from "@material-ui/core";
import Table from '@material-ui/core/Table';

/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */
export const ProfileData = (props) => {
    console.log(props.graphData);

    return (<Table>
            <TableBody>
                <TableRow>
                    <TableCell>Display Name </TableCell>
                    <TableCell>{props.graphData?.displayName || "N/A"} </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>First Name </TableCell>
                    <TableCell> {props.graphData?.givenName || "N/A"} </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Surname </TableCell>
                    <TableCell>{props.graphData?.surname || "N/A"} </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Job Title </TableCell>
                    <TableCell> {props.graphData?.jobTitle || "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Mail </TableCell>
                    <TableCell> {props.graphData?.mail || "N/A"} </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Mobile Phone</TableCell>
                    <TableCell>{props.graphData?.mobilePhone || "N/A"} </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Office Phone </TableCell>
                    <TableCell>{props.graphData?.officePhone || "N/A"} </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Office Location </TableCell>
                    <TableCell>{props.graphData?.officeLocation || "N/A"} </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Preferred Language </TableCell>
                    <TableCell>{props.graphData?.preferredLanguage || "N/A"} </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};
import React, { useState, useEffect } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import { PageLayout } from "./components/PageLayout";
import { ProfileData } from "./components/ProfileData";
import { QRCodeWithUserDetails } from "./components/QRCodeWithUserDetails";
import { callMsGraph, callMsGraphPhoto } from "./graph";
import "./styles/App.css";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [ graphData, setGraphData ] = useState(null);
    const [ userImage, setUserImage ] = useState(null);
    const [ userId, setUserId ] = useState(null);
    const classes = useStyles();

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[ 0 ]
        }).then((response) => {
            callMsGraph(response.accessToken).then(response => {
                setGraphData(response);
                setUserId(response.id);
            });
        });
    }
    function RequestUserImage(userId) {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[ 0 ]
        }).then((response) => {
            callMsGraphPhoto(response.accessToken, userId).then(response => {
                const imgUrl = URL.createObjectURL(response);
                setUserImage(imgUrl);
            });
        });
    }
    useEffect(() => {
        // console.log("accounts", accounts);
        RequestProfileData();
    }, [])
    useEffect(() => {
        if (userId != null) {
            RequestUserImage(userId);
        }
    }, [ userId ]);
    return (
        <>
            <h5 className="card-title">Welcome {accounts[ 0 ].name}</h5>
            <Grid container spacing={3} style={{ marginTop: 4 }}>
                <div className="col-md-6">
                    <Paper className={classes.paper} elevation={3}>
                        {graphData ?
                            <ProfileData graphData={graphData} />
                            :
                            <CircularProgress />
                        }

                    </Paper>
                </div>
                <div className="col-md-6">
                    <Paper className={classes.paper} elevation={3}>
                        {
                        }
                        {userImage && graphData ?
                            <QRCodeWithUserDetails userData={graphData} userImage={userImage} />
                            :
                            <CircularProgress />
                        }
                    </Paper>
                </div>
            </Grid>


        </>
    );
};

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5 className="card-title">Please sign-in to see your profile info and generate qr code.</h5>
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function App() {
    return (
        <PageLayout>
            <MainContent />
        </PageLayout>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 30
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        minHeight: 600
    },
    appBAR: {
        marginBottom: 10
    }
}));
import {Page, Image, Text, View, Document, StyleSheet, PDFViewer} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: "Helvetica",
    },
    section: {
        marginBottom: 20,
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 5,
    },
    header: {
        backgroundColor: "#4CAF50",
        color: "white",
        padding: 10,
        fontSize: 14,
        fontWeight: "bold",
    },
    table: {
        width: "100%",
        marginTop: 10,
    },
    row: {
        flexDirection: "row",
        borderBottom: "1px solid #ddd",
        paddingVertical: 5,
    },
    cell: {
        flex: 1,
        fontSize: 12,
    },
    bold: {
        fontWeight: 600,
        fontFamily: "Helvetica-Bold",
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#4CAF50",
        color: "white",
        textAlign: "center",
        borderRadius: 5,
        textDecoration: "none",
    },
});

const getClass = (selectedClass: string) => {
    switch (selectedClass) {
        case "class6":
            return "6";
        case "class7":
            return "7";
        case "class8":
            return "8";
        case "class9":
            return "9";
        case "class10":
            return "10";
        default:
            return "None";
    }
}

// Create Document Component
const StudentResultDocument = ({data, selectedClass}: {data: never | {
    roll: string,
    studentName: string,
    section: string,
    group: string,
    [_key: string]: string | number

    }, selectedClass: string}) => {

    return (
    <Document onRender={(props) => {
        const filename = `${selectedClass}-${data.studentName}-${data.roll}.pdf`;
        console.log(data);
        // return;
        if (data?.studentName) {
            const file = props.blob;
            console.log(file);

            if (!file) return;
            const url = URL.createObjectURL(file);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
            // console.error(instance.error);
        }}}
    >
        <Page size="A4" style={styles.page}>
            {/* Intro */}
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
                position: "relative",
            }}>
                <View style={{
                    position: "absolute",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    marginLeft: 20
                }}>
                    <Image src="" source={{
                        uri: "/img.png"
                    }} style={{
                        width: 80,
                        height: 80,
                    }} fixed />
                </View>

                <View style={{
                    // ...styles.section,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                }}>
                    <Text style={{
                        fontSize: 25,
                        color: "green",
                        fontWeight: "bold",
                        fontFamily: "Times-Bold"
                    }}>Rasulpur High School</Text>
                    <Text style={{fontSize: 9}}>Panchabati, Narsingdi Sadar, Narsingdi</Text>
                    <Text style={{fontSize: 18}}>Resultsheet of Annual Examination 2024</Text>

                </View>
            </View>

            {/* Student Information Summary */}
            <View style={styles.section}>
                <Text style={styles.header}>Student Information Summary</Text>
                <View style={styles.table}>
                    <View style={styles.row}>
                        <Text style={styles.cell}>
                            <Text style={styles.bold}>Class:</Text> {getClass(selectedClass)}
                        </Text>
                        <Text style={styles.cell}>
                            <Text style={styles.bold}>Section: </Text> {data.section}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>
                            <Text style={styles.bold}>Roll No:</Text> {data.roll}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>
                            <Text style={styles.bold}>Name:</Text> {data.studentName}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Subject-wise Grades */}
            <View style={styles.section}>
                <Text style={styles.header}>Subject-wise Grade/Marks</Text>
                <View style={styles.table}>
                    <View style={styles.row}>
                        <Text style={{
                            ...styles.cell,
                            marginLeft: 20,
                        }}>
                            <Text style={styles.bold}>Subject Name</Text>
                        </Text>
                        <Text style={{
                            ...styles.cell,
                            textAlign: "center",
                            fontFamily: "Helvetica-Bold"
                        }}>
                            <Text style={styles.bold}>Marks</Text>
                        </Text>
                    </View>
                    {
                        Object.keys(data).filter(x => !["roll", "studentName", "section", "group"].includes(x)).map(
                            subject => {
                                if (subject.toLowerCase().includes("grand")) {
                                    return (
                                        <View style={{
                                            ...styles.row,
                                            fontFamily: "Helvetica-Bold"
                                        }} key={subject}>
                                            <Text style={{
                                                ...styles.cell,
                                                marginLeft: 20
                                            }}>
                                                {
                                                    subject === "Life & Livelyhood" ? "Life & Livelihood" :
                                                        subject === "grand" ? "Total" :
                                                            subject
                                                }
                                            </Text>
                                            <Text style={{
                                                ...styles.cell,
                                                textAlign: "center"
                                            }}>{data[subject]}</Text>
                                        </View>
                                    )
                                }
                                return (
                                    <View style={styles.row} key={subject}>
                                        <Text style={{
                                            ...styles.cell,
                                            marginLeft: 20
                                        }}>
                                            {
                                                subject === "Life & Livelyhood" ? "Life & Livelihood" :
                                                    subject === "grand" ? "Total" :
                                                        subject
                                            }
                                        </Text>
                                        <Text style={{
                                            ...styles.cell,
                                            textAlign: "center"
                                        }}>{data[subject]}</Text>
                                    </View>
                                )
                            }
                        )
                    }
                </View>
            </View>

            {/* Status */}
            <View style={{
                fontSize: 12,
                fontFamily: "Helvetica-Bold",
            }}>
                <Text>Result Summary: {" "}
                    <Text style={{
                    }}>
                        <Text style={{
                        }}>
                            Passed
                        </Text>
                        {" / "}
                        <Text style={{
                        }}>
                            Failed
                        </Text>
                    </Text>
                </Text>
            </View>


            {/* Signature */}
            <View style={{
                marginTop: 100
            }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: 12 }}>
                    <View style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <Text style={{ textAlign: "center" }}>Verified By</Text>
                    </View>
                    <View style={{  flex: 1, display: "flex", flexDirection: "column" }}>
                        <Text style={{ textAlign: "center" }}>Signature of Class Teacher</Text>
                    </View>
                    <View style={{  flex: 1, display: "flex", flexDirection: "column" }}>
                        <Text style={{ textAlign: "center" }}>Signature of Headmaster</Text>
                    </View>
                </View>
            </View>

        </Page>
    </Document>
)};

const StudentResultPDF = ({data, selectedClass}: {data: {
    roll: string,
    studentName: string,
    section: string,
    group: string,
    }, selectedClass: string}) => {
    return (
        <div>
            {
                data?.studentName ? (<PDFViewer style={{
                        width: "100%",
                        height: "90vh"
                    }}
                    >
                        <StudentResultDocument data={data} selectedClass={selectedClass} />
                    </PDFViewer>) :
                <h1 className="text-2xl font-bold text-center">No Data Found</h1>

            }
            {/*<PDFDownloadLink document={<StudentResultDocument data={data} selectedClass={selectedClass} />} fileName="somename.pdf">*/}
            {/*    {({ blob, url, loading, error }) =>*/}
            {/*        <div>{loading ? 'Loading document...' : 'Download now!'}</div>*/}
            {/*    }*/}
            {/*</PDFDownloadLink>*/}
        </div>
    );
}

export default StudentResultPDF;

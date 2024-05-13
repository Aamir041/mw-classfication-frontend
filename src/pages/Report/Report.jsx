import React, { useEffect, useState } from 'react';
import "./Report.css";
import SideNavbar from "../../components/SideNavbar/SideNavbar"
import { useCookies } from 'react-cookie';
import { makeAuthenticatedGETRequest } from '../../utils/helper';
import Loader from '../../components/Loader/Loader';
import { Cell, Legend, Pie, PieChart } from 'recharts';
import { json2csv } from 'json-2-csv';

function Report() {
    let COLORS = ["#E81416", "#FFA500", "#FAEB36", "#79C314", "#487DE7", "#4B369D", "#70369D"];
    let collection = [
        { name: "gauze", value: 0 },
        { name: "glove_pair_latex", value: 0 },
        { name: "glove_pair_surgery", value: 0 },
        { name: "medical_cap", value: 0 },
        { name: "medical_glasses", value: 0 },
        { name: "test_tube", value: 0 },
        { name: "urine_bag", value: 0 },
    ]
    const [finalCollection, setFinalCollection] = useState([])
    const [cookie, setCookie] = useCookies(['token']);
    const [loadingRes, setLoadingRes] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        const getResponse = async () => {
            const response = await makeAuthenticatedGETRequest("/report/generate", cookie.token);
            if (response) {
                addDataToCollections(response);
                setLoadingRes(false);
            }
            setData(response)
        }
        getResponse();

    }, [])

    const addDataToCollections = (response) => {

        let length = response.length;

        response.map((waste) => {
            for (let i = 0; i < collection.length; i++) {
                if (collection[i].name === waste.waste_name) {
                    collection[i].value = collection[i].value + 1;
                }
            }
        });

        let tempFinalCollection = [];

        collection.map((ele) => {
            let name = ele.name;
            let value = (ele.value / length) * 100;
            if (!(value === 0)) {
                let obj = { name, value };
                tempFinalCollection.push(obj)
            }

        })

        setFinalCollection(tempFinalCollection)
    }

    const downloadReport = async () => {
        let csvData = await json2csv(data);
        let blob = new Blob([csvData], { type: 'text/csv' })
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        document.body.appendChild(a);
        a.click();
    }



    return (
        <SideNavbar>
            <div className='report-component'>


                {
                    loadingRes
                    &&
                    <div className="classify-loading-result">
                        <Loader dimension={5} />
                        <p>Loading Results</p>
                    </div>

                }

                <div className='report-button-container' >
                    <button className='report-button' onClick={downloadReport}>
                        Download
                    </button>
                </div>

                <PieChart width={1250} height={550} className='wewe' style={{ position: "relative" }} >
                    <Pie
                        data={finalCollection}
                        color="#000000"
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                    >
                        {finalCollection.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Legend />
                </PieChart>
            </div>
        </SideNavbar>
    )
}

export default Report
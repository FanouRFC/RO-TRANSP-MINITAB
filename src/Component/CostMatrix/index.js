import React from "react";
import {
    RemainingRight,
    RemainingBottom,
} from "../../Layouts/BaseSolutionStepsLayout/BaseSolutionStepsLayout.Style";

const CostMatrix = ({
    nbLigne,
    nbColonne,
    etatMatrice,
    disponibilites,
    demandes,
    originalMatrix
}) => {

    console.log("original ", originalMatrix)

    return (

        <table className="transport-table">

            <thead>

                <tr>

                    <th></th>

                    {Array.from({ length: nbColonne }, (_, j) => (
                        <th key={j}>{j + 1}</th>
                    ))}

                    <th className="outside-cell"></th>

                </tr>

            </thead>

            <tbody>

                {Array.from({ length: nbLigne }, (_, i) => (

                    <tr key={i}>

                        <th>{String.fromCharCode(65 + i)}</th>

                        {Array.from({ length: nbColonne }, (_, j) => {

                            const key = `a${i + 1}b${j + 1}`;

                            const valeur = etatMatrice[key];
                            const index = i * nbColonne + j;
                            const originalValue = originalMatrix[index];

                            return (

                                <td
                                    key={key}
                                    className={`cell ${
                                        valeur === Infinity ? "disabled" : ""
                                    }`}
                                >

                                    {/* {valeur !== Infinity && ( */}
                                        <span className="cost">
                                            {originalValue}
                                        </span>
                                    {/* )} */}

                                </td>

                            );
                        })}

                        <RemainingRight className="outside-cell">
                            {disponibilites[i]}
                        </RemainingRight>

                    </tr>

                ))}

                <tr className="outside-row">

                    <th className="outside-cell"></th>

                    {demandes.map((d, i) => (

                        <RemainingBottom
                            key={i}
                            className="outside-cell"
                        >
                            {d}
                        </RemainingBottom>

                    ))}

                    <td className="outside-cell"></td>

                </tr>

            </tbody>

        </table>

    );
};

export default CostMatrix;
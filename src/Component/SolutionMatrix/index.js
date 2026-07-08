import React from "react";
import {
    RemainingRight,
    RemainingBottom,
} from "../../Layouts/BaseSolutionStepsLayout/BaseSolutionStepsLayout.Style";

const SolutionMatrix = ({
    nbLigne,
    nbColonne,
    etatMatrice,
    solution,
    disponibilites,
    demandes,
}) => {

    const isForbidden = (val) =>
        val === Infinity ||
        val === "Infinity" ||
        val === null ||
        val === undefined;

    const getValue = (key) => {
        const v = solution?.[key];
        return v;
    };

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

                            const value = getValue(key);

                            const forbidden = isForbidden(etatMatrice?.[key]);


                            return (

                                <td key={key} className="cell">

                                    <span className="allocation">
                                        {/* {forbidden
                                            ? "-"
                                            : value !== undefined && value !== null
                                                ? value === 0.000001
                                                    ? "ε"
                                                    : value
                                                : ""
                                        } */}
                                        {
                                            (value !== undefined && value !== null)? (value === 0.000001? "ε": value) :
                                            forbidden? "-" : ""
                                        }
                                    </span>

                                </td>

                            );

                        })}

                        <RemainingRight className="outside-cell">
                            {disponibilites?.[i]}
                        </RemainingRight>

                    </tr>

                ))}

                <tr className="outside-row">

                    <th className="outside-cell"></th>

                    {demandes?.map((d, i) => (

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

export default SolutionMatrix;
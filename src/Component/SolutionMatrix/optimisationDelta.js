import React from "react";
import {
    RemainingRight,
    RemainingBottom,
    StepsLayoutContainer
} from "../../Layouts/BaseSolutionStepsLayout/BaseSolutionStepsLayout.Style";

const OptimisedDelta = ({
    nbLigne,
    nbColonne,
    etatMatrice,
    solution,
    signes
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
    console.log(solution)

    return (
        <StepsLayoutContainer>
            <table className="transport-table">

                <thead>

                    <tr>

                        <th></th>

                        {Array.from({ length: nbColonne }, (_, j) => (
                            <th key={j}>{j + 1}</th>
                        ))}

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
                                const signIndex = signes.indexOf(key);
                                const sign = signIndex !== -1? (signIndex % 2 === 0 ? "+" : "-"): null;
                                

                                return (

                                    <td key={key} className="cell">

                                        {sign && (
                                            <span className={"sign"}>
                                                {sign}
                                            </span>
                                        )}

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
                                                ""
                                            }
                                        </span>

                                    </td>

                                );

                            })}

                        </tr>

                    ))}

                </tbody>

            </table>
        </StepsLayoutContainer>

    );
};

export default OptimisedDelta;
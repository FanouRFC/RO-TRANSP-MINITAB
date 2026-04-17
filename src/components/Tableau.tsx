import "../services/Minitab.ts"
import { minitab } from "../services/Minitab.ts"

export default function Tableau() 
{
    minitab();
    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td></td>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                    </tr>
                    <tr>
                        <th>A</th>
                        <th>12</th>
                        <th>32</th>
                        <th>90</th>
                        <th>99</th>
                        <th>99</th>
                    </tr>
                    <tr>
                        <th>B</th>
                        <th>12</th>
                        <th>32</th>
                        <th>90</th>
                        <th>99</th>
                        <th>99</th>
                    </tr>
                    <tr>
                        <th>C</th>
                        <th>12</th>
                        <th>32</th>
                        <th>90</th>
                        <th>99</th>
                        <th>99</th>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

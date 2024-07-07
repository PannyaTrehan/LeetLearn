import { Table } from 'react-bootstrap';

function ProblemsTable() {
    return(
        <Table striped hover variant="dark">
            <thead>
                <tr>
                    <th>Problem</th>
                    <th>Next Scheduled</th>
                    <th>Last Submission</th>
                    <th>Success</th>
                    <th>Difficulty</th>
                    <th>Proficiency</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Two Sum</td>
                    <td>7/07/2024</td>
                    <td>4/07/2024</td>
                    <td>40% (2/5)</td>
                    <td>Easy</td>
                    <td>Expert</td>
                </tr>
                <tr>
                    <td>Two Sum</td>
                    <td>7/07/2024</td>
                    <td>4/07/2024</td>
                    <td>40% (2/5)</td>
                    <td>Easy</td>
                    <td>Expert</td>
                </tr>
                <tr>
                    <td>Two Sum</td>
                    <td>7/07/2024</td>
                    <td>4/07/2024</td>
                    <td>40% (2/5)</td>
                    <td>Easy</td>
                    <td>Expert</td>
                </tr>
                <tr>
                    <td>Two Sum</td>
                    <td>7/07/2024</td>
                    <td>4/07/2024</td>
                    <td>40% (2/5)</td>
                    <td>Easy</td>
                    <td>Expert</td>
                </tr>
                <tr>
                    <td>Two Sum</td>
                    <td>7/07/2024</td>
                    <td>4/07/2024</td>
                    <td>40% (2/5)</td>
                    <td>Easy</td>
                    <td>Expert</td>
                </tr>
            </tbody>
        </Table>
    );
}

export default ProblemsTable
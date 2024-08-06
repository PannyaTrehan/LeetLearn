import { Table } from 'react-bootstrap';

interface TopicTag {
    name: string;
    id: string;
    slug: string;
}
  
interface Question {
    acRate: number;
    difficulty: string;
    freqBar: any; // Adjust type if known
    frontendQuestionId: string;
    isFavor: boolean;
    paidOnly: boolean;
    status: any; // Adjust type if known
    title: string;
    titleSlug: string;
    topicTags: TopicTag[];
    hasSolution: boolean;
    hasVideoSolution: boolean;
}

interface ProblemsTableProps {
    data: Question[] | null;
}

function ProblemsTable({data}: ProblemsTableProps) {
    if (!data) return null;

    return(
        <Table striped hover variant="dark">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Difficulty</th>
                    <th>Acceptance Rate</th>
                    <th>Tags</th>
                </tr>
            </thead>
            <tbody>
                {data.map((question: Question) => (
                <tr key={question.frontendQuestionId}>
                    <td>{question.frontendQuestionId}</td>
                    <td>{question.title}</td>
                    <td>{question.difficulty}</td>
                    <td>{question.acRate.toFixed(1)}</td>
                    <td>
                        {question.topicTags.map(tag => (
                            <span key={tag.id}>{tag.name}, </span>
                        ))}
                    </td>
                </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default ProblemsTable
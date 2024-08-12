import { Table } from 'react-bootstrap';
import { createQuestion, createUserQuestion } from '../api/QuestionRequests';

interface Tag {
    title: string;
}

interface DailyQuestion {
    title: string;
    difficulty: string;
    tags: Tag[];
}

interface DailyQuestionsResponse {
    next_review: string;
    question: DailyQuestion;
}

interface DailyQuestionsTableProps {
    data: DailyQuestionsResponse[] | null;
}

function DailyQuestionsTable({data}: DailyQuestionsTableProps) {
    if (!data) return null;

    return(
        <Table striped hover variant="dark">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Difficulty</th>
                    <th>Tags</th>
                    <th>Next Review</th>
                </tr>
            </thead>
            <tbody>
                {data.map((entry, index) => (
                    <tr key={index}>
                        <td>{entry.question.title}</td>
                        <td>{entry.question.difficulty}</td>
                        <td>
                            {entry.question.tags.map((tag, tagIndex) => (
                                <span key={tagIndex}>{tag.title}{tagIndex < entry.question.tags.length - 1 ? ', ' : ''}</span>
                            ))}
                        </td>
                        <td>{new Date(entry.next_review).toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default DailyQuestionsTable
import { Table, Container } from 'react-bootstrap';

interface Tag {
    tag_name: string;
}

interface DailyQuestion {
    title: string;
    difficulty: string;
    question_tag: Tag[];
}

interface DailyQuestionsResponse {
    next_review: string;
    question: DailyQuestion;
}

interface DailyQuestionsTableProps {
    data: DailyQuestionsResponse[] | null;
    onRowClick: (entry: string) => void;
}

function ReviewTable({data, onRowClick}: DailyQuestionsTableProps) {
    if (!data) return null;

    return(
        <Container style={{ maxHeight: '500px', overflowY: 'auto' }} className="p-0">
            <Table striped hover variant="dark" responsive>
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
                        <tr key={index} onClick={() => onRowClick(entry.question.title)}>
                            <td>{entry.question.title}</td>
                            <td>{entry.question.difficulty}</td>
                            <td>
                                {entry.question.question_tag.length > 0 ? (
                                        entry.question.question_tag.map((tag, tagIndex) => (
                                            <span key={tagIndex}>
                                                {tag.tag_name}
                                            </span>
                                        ))
                                    ) : (
                                        <span></span>
                                )}
                            </td>
                            <td>{new Date(entry.next_review).toLocaleDateString('en-GB')}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default ReviewTable
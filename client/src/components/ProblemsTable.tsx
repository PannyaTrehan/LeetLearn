import { Table } from 'react-bootstrap';
import { createQuestion } from '../api/QuestionRequests';
import { createUserQuestion } from '../api/UserQuestionRequests';
import { Question } from '../graphql/types/QuestionTypes';

interface ProblemsTableProps {
    data: Question[] | null;
}

function ProblemsTable({data}: ProblemsTableProps) {
    if (!data) return null;

    const handleProblemClick = async (question: Question) => {
        try {
            if (!question || !question.frontendQuestionId || !question.title || !question.difficulty) {
                console.error('Invalid question object:', question);
                return;
            }

            const title = `${question.frontendQuestionId}. ${question.title}`;
            const difficulty = question.difficulty;
            const state = 'Learning';

            const questionResponse = await createQuestion({
                title,
                difficulty
            });

            const next_review = "2024-08-09T00:00:00.000Z";

            const userQuestionResponse = await createUserQuestion({
                title,
                next_review,
                state
            })

            console.log("Question created:", questionResponse)
            console.log("User question created:", userQuestionResponse)
        } catch (error) {
            console.error('Error creating question:', error);
        }
    };

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
                <tr key={question.frontendQuestionId} onClick={() => handleProblemClick(question)}>
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
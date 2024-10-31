import { Table } from 'react-bootstrap';
import { createQuestion, createQuestionTag } from '../api/QuestionRequests';
import { createUserQuestion } from '../api/UserQuestionRequests';
import { Question } from '../graphql/types/QuestionTypes';

interface ProblemsTableProps {
    data: Question[] | null;
}

function AddQuestionTable({data}: ProblemsTableProps) {
    if (!data) return null;

    const handleProblemClick = async (question: Question) => {
        try {
            if (!question || !question.frontendQuestionId || !question.title || !question.difficulty) {
                console.error('Invalistated question object:', question);
                return;
            }

            const title = `${question.frontendQuestionId}. ${question.title}`;
            const difficulty = question.difficulty;
            const state = 'New';

            await createQuestion({
                title,
                difficulty
            });

            //By default the next review for a new user question is scheduled for the day after it was added
            const next_review = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();

            await createUserQuestion({
                title,
                next_review,
                state
            })

            for (const tag of question.topicTags) {
                await createQuestionTag({
                    questionTitle: title,
                    tagName: tag.name
                });
            }
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
                <tr
                    key={question.frontendQuestionId}
                    onClick={() => handleProblemClick(question)}
                    style={{ cursor: 'pointer' }}
                >
                    <td>{question.frontendQuestionId}</td>
                    <td>{question.title}</td>
                    <td>{question.difficulty}</td>
                    <td>{question.acRate.toFixed(0)}%</td>
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

export default AddQuestionTable
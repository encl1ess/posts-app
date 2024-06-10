import { ChangeEvent, FormEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import { commentsActionsAsync } from '../model/commentsReducer';
import { Comment, CommentBody } from '../model/types';

interface AddCommentFormProps {
  postId: number;
  data?: Comment;
  onSubmit?: () => void;
}

export const AddCommentForm = ({
  postId,
  data,
  onSubmit,
}: AddCommentFormProps) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<CommentBody>({
    email: data?.email ?? '',
    name: data?.name ?? '',
    body: data?.body ?? '',
    postId,
  });
  const [errors, setErrors] = useState<Record<string, boolean> | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const fieldsErrors = {};

    for (const [key, value] of Object.entries(formData)) {
      if (!value) Object.assign(fieldsErrors, { [key]: true });
    }

    if (Object.values(fieldsErrors).length > 0) {
      setErrors(fieldsErrors);
      return;
    }

    setErrors(null);

    data
      ? dispatch(
          commentsActionsAsync.updateComment({ id: data.id, body: formData }),
        )
      : dispatch(commentsActionsAsync.addComment(formData));

    setFormData({
      email: '',
      name: '',
      body: '',
      postId,
    });
    onSubmit?.();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setErrors({ ...errors, [name]: false });
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Form
      className="d-flex flex-column gap-3"
      name="AddComment"
      id="AddComment"
    >
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          name="name"
          type="text"
          placeholder="Write your name here"
          value={formData.name}
          onChange={handleChange}
        />
        {!!errors?.name && (
          <Form.Label className="text-danger">
            Please provide a valid name.
          </Form.Label>
        )}
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          required
          name="email"
          type="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />
        {!!errors?.email && (
          <Form.Label className="text-danger">
            Please provide a valid email.
          </Form.Label>
        )}
      </Form.Group>
      <Form.Group controlId="body">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          required
          name="body"
          value={formData.body}
          as="textarea"
          placeholder="Write your comment here"
          onChange={handleChange}
        />
        {!!errors?.body && (
          <Form.Label className="text-danger">
            Please provide a valid comment.
          </Form.Label>
        )}
      </Form.Group>
      <Button
        className="ms-auto"
        type="submit"
        form="AddComment"
        onClick={handleSubmit}
      >
        {data ? 'Edit' : 'Submit'}
      </Button>
    </Form>
  );
};

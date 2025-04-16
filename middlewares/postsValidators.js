import validator from 'validator';

export const postsValidation = (req, res, next) => {
    const { title, content, isPrivate } = req.body;
    const errors = [];

    const trimmedTitle = title?.trim() || '';
    const trimmedContent = content?.trim() || '';

    if (validator.isEmpty(trimmedTitle)) {
        errors.push({ error: 'Title is required' });
    }

    if (validator.isEmpty(trimmedContent)) {
        errors.push({ error: 'Content is required' });
    }

    if (typeof isPrivate !== 'boolean') {
        errors.push({ error: 'Visibility is required' });
    }

    if (errors.length > 0) {
        return res.status(400).send({
          error: 'Invalid post data',
          details: errors
        });
    }
    
    req.postData = {
        title: trimmedTitle,
        content: trimmedContent,
        isPrivate: isPrivate
    }

    next();
};
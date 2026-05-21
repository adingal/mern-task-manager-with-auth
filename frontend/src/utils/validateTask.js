export function validateAndSanitizeTask(input) {
  const errors = {}

  const sanitized = {
    _id: input._id, // keep id if present
    title: input.title ? input.title.trim() : '',
    description: input.description ? input.description.trim() : '',
  }

  // Title validation
  if (!sanitized.title) {
    errors.title = 'A task must have a name.'
  } else if (sanitized.title.length < 10) {
    errors.title = 'Title must be at least 10 characters.'
  } else if (sanitized.title.length > 40) {
    errors.title = 'Title must be 40 characters or less.'
  }

  // Description validation
  if (!sanitized.description) {
    errors.description = 'A task must have a description.'
  } else if (sanitized.description.length < 10) {
    errors.description = 'Description must be at least 10 characters.'
  } else if (sanitized.description.length > 120) {
    errors.description = 'Description must be 120 characters or less.'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized,
  }
}

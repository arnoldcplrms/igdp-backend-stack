type PrismaErrorResult = {
  status: number;
  message: string;
  error: string;
};

export const mapPrismaError = (exception: any): PrismaErrorResult | null => {
  // Unique constraint failed
  if (exception.code === 'P2002') {
    const fields = exception.meta?.target || [];

    return {
      status: 409,
      message:
        fields.length > 0
          ? `${fields.join(', ')} already exists`
          : 'Duplicate field value',
      error: 'Conflict',
    };
  }

  // Record not found
  if (exception.code === 'P2025') {
    return {
      status: 404,
      message: 'Record not found',
      error: 'NotFound',
    };
  }

  // Foreign key constraint
  if (exception.code === 'P2003') {
    return {
      status: 400,
      message: 'Invalid reference to related record',
      error: 'BadRequest',
    };
  }

  return null;
};

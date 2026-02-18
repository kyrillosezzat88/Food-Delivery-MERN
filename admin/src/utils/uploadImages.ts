interface FileProcessingOptions {
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  onError: (message: string) => void;
  onSuccess: (urls: string[]) => void;
}

export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

export const validateFiles = (
  files: File[],
  maxSize: number = 5 * 1024 * 1024,
  allowedTypes: string[] = ["image/"],
): { valid: boolean; error?: string } => {
  if (files.length === 0) {
    return { valid: false, error: "No files selected" };
  }

  for (const file of files) {
    // Check file type
    const isValidType = allowedTypes.some((type) => file.type.startsWith(type));
    if (!isValidType) {
      return {
        valid: false,
        error: `Only ${allowedTypes.join(", ")} files are allowed`,
      };
    }

    // Check file size
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File size must be less than ${(maxSize / 1024 / 1024).toFixed(0)}MB`,
      };
    }
  }

  return { valid: true };
};

export const processFiles = async (
  files: File[],
  options: FileProcessingOptions,
): Promise<void> => {
  const {
    maxSize = 5 * 1024 * 1024,
    allowedTypes = ["image/"],
    onError,
    onSuccess,
  } = options;

  // Validate files
  const validation = validateFiles(files, maxSize, allowedTypes);
  if (!validation.valid) {
    onError(validation.error || "Invalid files");
    return;
  }

  try {
    // Convert files to Data URLs
    const urls = await Promise.all(files.map(readFileAsDataURL));
    onSuccess(urls);
  } catch (err) {
    console.error(err);
    onError("Failed to read files");
  }
};

export function handleNetworkError(error: unknown): void {
  if (isFetchError(error)) {
    // Gắn code tùy chỉnh để nhận biết là lỗi mạng
    (error as FetchError).code = "ERR_NETWORK";
  }

  // Có thể thêm alert/toast ở đây nếu muốn
  // flashMessage("error", "Lost connection to the server.")

  throw error;
}

type FetchError = Error & { code?: string };

function isFetchError(error: unknown): error is FetchError {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    "message" in error &&
    (error as Error).name === "TypeError" &&
    (error as Error).message === "Failed to fetch"
  );
}

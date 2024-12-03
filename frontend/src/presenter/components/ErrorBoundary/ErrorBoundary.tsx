import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

const ErrorBoundary: React.FC = () => {
  const error = useRouteError()
  let errorMessage: string

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    errorMessage = 'Unknown error'
  }

  console.error(errorMessage)

  return <div>{errorMessage}</div>
}

export default ErrorBoundary

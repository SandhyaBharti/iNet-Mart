const ErrorMessage = ({ message }) => {
    if (!message) return null;

    return (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-4">
            {message}
        </div>
    );
};

export default ErrorMessage;

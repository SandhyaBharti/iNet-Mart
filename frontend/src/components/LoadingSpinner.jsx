const LoadingSpinner = ({ size = 'default' }) => {
    const sizeClass = size === 'small' ? 'w-5 h-5 border-2' : 'w-10 h-10 border-3';

    return (
        <div className="flex items-center justify-center p-8">
            <div className={`${sizeClass} border-slate-700 border-t-primary rounded-full animate-spin`}></div>
        </div>
    );
};

export default LoadingSpinner;

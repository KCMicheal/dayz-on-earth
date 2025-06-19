import { useState, useCallback, useMemo, memo } from "react";
import { getTimeStamp } from "../Timestamp";

// Define form state interface
interface FormState {
  name?: string;
  date?: string;
  diffInDayz?: string;
  submitted: boolean;
  loading: boolean;
  errors: {
    name: string | null;
    date: string | null;
  };
  showTryAgain: boolean;
}

// Initial form state
const initialFormState: FormState = {
  name: undefined,
  date: undefined,
  diffInDayz: undefined,
  submitted: false,
  loading: false,
  errors: {
    name: null,
    date: null,
  },
  showTryAgain: false,
};

// Input component for reusability
const FormInput = memo(({ 
  type, 
  onChange, 
  placeholder, 
  error 
}: { 
  type: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  placeholder?: string; 
  error: string | null;
}) => (
  <>
    <input
      className="w-70 text-center text-gray-700 mb-2 px-4 py-2 border border-gray-300 rounded-md shadow-md"
      type={type}
      onChange={onChange}
      placeholder={placeholder}
    />
    <div className="text-red-500 text-center h-6">
      {error || "\u00A0"}
    </div>
  </>
));

// Button component for reusability
const Button = memo(({ 
  onClick, 
  className, 
  children 
}: { 
  onClick: () => void; 
  className: string; 
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={className}
  >
    {children}
  </button>
));

export function TimeStamp() {
  // Use a single state object instead of multiple state variables
  const [formState, setFormState] = useState<FormState>(initialFormState);
  
  // Memoized button class for reuse
  const buttonClass = useMemo(() => 
    "w-32 bg-gradient-to-l from-blue-500 to-green-500 text-white px-4 py-2 rounded", 
    []
  );

  // Handle input changes with field name parameter
  const handleInputChange = useCallback((field: 'name' | 'date') => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormState(prev => ({
        ...prev,
        [field]: event.target.value,
        errors: {
          ...prev.errors,
          [field]: null
        }
      }));
    }, 
  []);

  // Submit form data
  const getDayz = useCallback(() => {
    // Validate form
    const nameError = !formState.name ? "Sorry we'd need a name 🤲!" : null;
    const dateError = !formState.date ? "Think you forgot to add the date 😄 !" : null;
    
    if (nameError || dateError) {
      setFormState(prev => ({
        ...prev,
        errors: {
          name: nameError,
          date: dateError
        }
      }));
      
      if (nameError || dateError) {
        console.error("Both name and date must be provided.");
        return;
      }
    }

    // Process form if valid
    if (formState.name && formState.date) {
      // Set loading state
      setFormState(prev => ({ ...prev, loading: true }));
      
      // Calculate days with a delay for UX
      setTimeout(() => {
        const dayz = getTimeStamp(formState.name!, formState.date!);
        
        setFormState(prev => ({ 
          ...prev, 
          diffInDayz: dayz?.diffInDays,
          loading: false,
          submitted: true
        }));
        
        // Show try again button after a delay
        setTimeout(() => {
          setFormState(prev => ({ ...prev, showTryAgain: true }));
        }, 1400);
      }, 1600);
    }
  }, [formState.name, formState.date]);

  // Reset form
  const tryAgain = useCallback(() => {
    setFormState(initialFormState);
  }, []);

  // Destructure values from state for cleaner JSX
  const { 
    name, 
    date, 
    diffInDayz, 
    submitted, 
    loading, 
    errors, 
    showTryAgain 
  } = formState;

  return (
    <div className="flex flex-col p-5 w-full h-[40vh] space-y-10">
      {!submitted && (
        <div className="text-center">
          <FormInput 
            type="text" 
            onChange={handleInputChange('name')} 
            placeholder="Your Name" 
            error={errors.name} 
          />

          <FormInput 
            type="date" 
            onChange={handleInputChange('date')} 
            error={errors.date} 
          />

          <div className="flex justify-center">
            <Button 
              onClick={getDayz} 
              className={buttonClass}
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </div>
      )}
      
      {submitted && (
        <div className="flex flex-col justify-center mx-auto slide-out">
          <div className="w-full text-center">
            <p className="text-2xl">
              Hi, <span className="font-medium">{name}</span>
            </p>
            <p className="text-2xl">
              Your birthday is on <span className="font-bold">{date}</span>
            </p>
            <p className="text-2xl">This is Day</p>
            <p className="text-8xl font-extrabold">{diffInDayz}</p>
          </div>
        </div>
      )}
      
      {showTryAgain && (
        <div className="text-center">
          <Button
            onClick={tryAgain}
            className={`${buttonClass} transition-transform ease-in delay-700`}
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}

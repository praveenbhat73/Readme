import { createContext, useContext, ReactNode, useState,useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
type MyBooksContextType = {
  onToggleSaved: (book: Book) => void;
  isBookSaved: (book: Book) => boolean;
  savedBooks: Book[];
};

const MyBooksContext = createContext<MyBooksContextType>({
  onToggleSaved: () => {},
  isBookSaved: () => false,
  savedBooks: [],
});

type Props = {
  children: ReactNode;
};

const MyBooksProvider = ({ children }: Props) => {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
    const[loaded,setloaded]=useState(false)
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if(loaded){
      persistData();
    }
  }, [savedBooks]);
  const areBooksTheSame = (a: Book, b: Book) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const isBookSaved = (book: Book) => {
    return savedBooks.some((savedBook) => areBooksTheSame(savedBook, book));
  };

  const onToggleSaved = (book: Book) => {
    if (isBookSaved(book)) {
      // remove from saved
      setSavedBooks((books) =>
        books.filter((savedBook) => !areBooksTheSame(savedBook, book))
      );
    } else {
      // add to saved
      setSavedBooks((books) => [book, ...books]);
    }
  };

  const persistData = async () => {
    // is used when we want to write something to local storage 
    await AsyncStorage.setItem('booksData', JSON.stringify(savedBooks));
  };
  const loadData = async () => {
    // read data 
    const dataString = await AsyncStorage.getItem('booksData');
    if (dataString) {
      const items = JSON.parse(dataString);
      setSavedBooks(items);
    }
  setloaded(true);
  };
  return (
    <MyBooksContext.Provider value={{ onToggleSaved, isBookSaved, savedBooks }}>
      {children}
    </MyBooksContext.Provider>
  );
};

export const useMyBooks = () => useContext(MyBooksContext);

export default MyBooksProvider;
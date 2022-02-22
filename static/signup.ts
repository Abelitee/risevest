interface valueNode {
  title: string;
  test: RegExp;
}
interface infoNode {
  title: string;
}

interface textChangeNode {
  text: string;
  idx: number;
  stateFunctions: {
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
    setNickname: React.Dispatch<React.SetStateAction<string>>;
  };
}

export const inputChecker: valueNode[] = [
  {
    title: "Minimum of 8 characters",
    test: new RegExp("^.{8,}$"),
  },
  {
    title: "One UPPERCASE character",
    test: new RegExp("(?=.*[A-Z])"),
  },
  {
    title: "One unique character (e.g: !@#$%^&*?)",
    test: new RegExp("(?=.*?[#?!@$%^&*-])"),
  },
];

export const signInfo: infoNode[] = [
  {
    title: "Legal First Name",
  },
  {
    title: "Legal Last Name",
  },
  {
    title: "Nick name",
  },
];

export function handleTextChange({
  text,
  idx,
  stateFunctions,
}: textChangeNode) {
  if (idx === 0) {
    return stateFunctions.setFirstName(text);
  }

  if (idx === 1) {
    return stateFunctions.setLastName(text);
  }

  if (idx === 2) {
    return stateFunctions.setNickname(text);
  }
}


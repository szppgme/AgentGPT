import type { FC } from "react";
import { useState } from "react";
import type { Session } from "next-auth";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import { get_avatar } from "../../utils/user";
import { FaSignInAlt } from "react-icons/fa";
import Dialog from "../../ui/dialog";

const AuthItem: FC<{
  session: Session | null;
  classname?: string;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}> = ({ session, classname, signOut, signIn }) => {
  const [t] = useTranslation("drawer");
  const [showDialog, setShowDialog] = useState(false);
  const user = session?.user;

  return (
    <div
      className={clsx(
        "text-color-primary mt-2 flex items-center justify-start gap-3 rounded-md px-2 py-2 text-sm font-semibold",
        "hover-bg-shade-700-light cursor-pointer dark:hover:bg-shade-700-dark",
        classname
      )}
      onClick={(e) => {
        user ? setShowDialog(true) : void signIn();
      }}
    >
      {user && (
        <img className="h-8 w-8 rounded-full bg-neutral-800" src={get_avatar(user)} alt="" />
      )}
      {!user && (
        <h1 className="ml-2 flex flex-grow items-center gap-2 text-center">
          <FaSignInAlt />
          {t("SIGN_IN")}
        </h1>
      )}

      <span className="sr-only">Your profile</span>
      <span aria-hidden="true">{user?.name}</span>
      <Dialog
        inline
        open={showDialog}
        setOpen={setShowDialog}
        title="My Account"
        icon={<img className="rounded-full bg-neutral-800" src={get_avatar(user)} alt="" />}
        actions={
          <>
            <button
              type="button"
              className="red-button-primary inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold shadow-sm"
              onClick={() => {
                signOut()
                  .then(() => setShowDialog(false))
                  .catch(console.error)
                  .finally(console.log);
              }}
            >
              Sign out
            </button>
            <button
              type="button"
              className="blue-button-secondary inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300"
              onClick={() => setShowDialog(false)}
            >
              Close
            </button>
          </>
        }
      >
        <p className="text-color-secondary text-sm">Name: {user?.name}</p>
        <p className="text-color-secondary text-sm">Email: {user?.email}</p>
      </Dialog>
    </div>
  );
};

export default AuthItem;

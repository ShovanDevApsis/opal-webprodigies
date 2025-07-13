import { onAuthenticateUser } from "@/actions/user";
import { verifyAccessToWorkspace } from "@/actions/workspace";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: { workspaceId: string };
  children: React.ReactNode;
};

const Layout = async ({ params, children }: Props) => {
  // Authenticate user first
  const auth = await onAuthenticateUser();
  
  // Redirect if no user or no workspaces
  if (!auth?.user?.workspace?.length) {
    redirect('/auth/sign-in');
  }

  // Verify access to the specific workspace
  const hasAccess = await verifyAccessToWorkspace(params.workspaceId);
  console.log(hasAccess);
  
  // Redirect if no access
  if (hasAccess.status !== 200 || !hasAccess.data) {
    redirect(`/dashboard/${auth.user.workspace[0].id}`); // Fallback to first accessible workspace
  }

  return <div>{children}</div>;
};

export default Layout;
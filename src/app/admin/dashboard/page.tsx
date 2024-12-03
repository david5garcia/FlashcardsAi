import authOptions from "@/lib/utils/auth/authOptions";
import { userService } from "@/server/services/auth/user.service";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const users = await userService.getAllUsers();
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Updated at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <p>{user.id}</p>
                  </TableCell>
                  <TableCell>
                    <p>{user.email}</p>
                  </TableCell>
                  <TableCell>
                    <p>{user.verified ? "Yes" : "No"}</p>
                  </TableCell>
                  <TableCell>
                    <p>{user.role}</p>
                  </TableCell>
                  <TableCell>
                    <p>{new Date(user.createdAt).toLocaleString()}</p>
                  </TableCell>
                  <TableCell>
                    <p>{new Date(user.updatedAt).toLocaleString()}</p>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default page;

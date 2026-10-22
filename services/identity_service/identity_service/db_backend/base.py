"""
Custom PostgreSQL backend for Neon that sets search_path=public
on every new connection before Django uses it.
"""
from django.db.backends.postgresql import base


class DatabaseWrapper(base.DatabaseWrapper):
    def get_new_connection(self, conn_params):
        connection = super().get_new_connection(conn_params)
        # Must use autocommit mode to run SET outside a transaction
        prev_autocommit = connection.autocommit
        connection.autocommit = True
        with connection.cursor() as cursor:
            cursor.execute("CREATE SCHEMA IF NOT EXISTS identity; SET search_path TO identity, public")
        connection.autocommit = prev_autocommit
        return connection
